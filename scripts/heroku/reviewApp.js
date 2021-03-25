// <3 https://github.com/Financial-Times/n-heroku-tools
const pRetry = require('p-retry')
const fetch = require('isomorphic-unfetch')
const actions = require('@actions/core')

const {
  HEROKU_API_KEY,
  HEROKU_PIPELINE,
  GITHUB_PULL_REQUEST_HEAD_SHA,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  GITHUB_HEAD_REF,
} = process.env

const HEROKU_API_URL = 'https://api.heroku.com'
const GITHUB_API_URL = 'https://api.github.com'

const NUM_RETRIES = 30
const RETRY_EXP_BACK_OFF_FACTOR = 1
const MIN_TIMEOUT = 10 * 1000

const REVIEW_APP_STATUSES = {
  pending: 'pending',
  deleted: 'deleted',
  creating: 'creating',
  created: 'created',
  errored: 'errored',
}

const BUILD_STATUSES = {
  succeeded: 'succeeded',
  failed: 'failed',
  pending: 'pending',
}

const fetcher = async (url, options) => {
  try {
    const response = await fetch(url, options)

    const { ok, status } = response

    const data = await response.json()

    if (!ok) {
      const error = new Error(data.message)
      error.data = { status, url, data }

      console.error('FETCH ERROR:', error)
      return { data: undefined, error }
    }

    return { data }
  } catch (error) {
    return { error }
  }
}

const getGithubArchiveUrl = async ({ repo, branch }) => {
  if (!GITHUB_TOKEN || !repo || !branch) {
    const error = new Error('REQUIRED:')
    error.data = {
      GITHUB_TOKEN,
      repo,
      branch,
    }

    console.error(error)

    return
  }

  const url = `${GITHUB_API_URL}/repos/ibsukru/${encodeURIComponent(
    repo,
  )}/tarball/${encodeURIComponent(branch)}`

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
    redirect: 'manual',
  })

  const { status, headers } = response
  if (status === 302) {
    return headers.get('location')
  }

  const error = await response.json()
  throw new Error(
    `Unexpected response for ${url} (${status}): ${JSON.stringify(error)}`,
  )
}

const getHerokuHeaders = ({ useReviewAppApi } = {}) => {
  return {
    Accept: `application/vnd.heroku+json; version=3${
      useReviewAppApi ? '.review-apps' : ''
    }`,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${HEROKU_API_KEY}`,
  }
}

const getPipeline = async pipelineName => {
  const url = `${HEROKU_API_URL}/pipelines/${pipelineName}`

  const { data } = await fetcher(url, {
    headers: getHerokuHeaders(),
  })

  return data
}

// https://devcenter.heroku.com/articles/platform-api-referenceapp-info
const getHerokuApp = async appId => {
  const { data } = await fetcher(`${HEROKU_API_URL}/apps/${appId}`, {
    headers: getHerokuHeaders(),
  })

  return data
}

const getHerokuBuild = async ({ appId, commit }) => {
  console.info(`${HEROKU_API_URL}/apps/${appId}/builds`)

  const { data } = await fetcher(`${HEROKU_API_URL}/apps/${appId}/builds`, {
    headers: getHerokuHeaders(),
  })

  return data && data.find(({ source_blob: { version } }) => version === commit)
}

const waitTillReviewAppCreated = ({
  appId,
  commit,
  minTimeout = MIN_TIMEOUT,
} = {}) => {
  const checkForCreatedStatus = async () => {
    const headers = getHerokuHeaders({ useReviewAppApi: true })
    const { data, error } = await fetcher(
      `${HEROKU_API_URL}/review-apps/${appId}`,
      {
        headers,
      },
    )

    if (!data) {
      throw new pRetry.AbortError(`ERROR: ${error}`)
    }

    const { status, message, app } = data

    if (status === REVIEW_APP_STATUSES.deleted) {
      throw new pRetry.AbortError(`Review app was deleted: ${message}`)
    }

    if (status === REVIEW_APP_STATUSES.errored) {
      if (!app) {
        throw new pRetry.AbortError(`EMPTY: ${message}`)
      }
      try {
        const { output_stream_url } = await getHerokuBuild({
          appId: app.id,
          commit,
        })
        console.error(
          `App (${appId}, commit: ${commit}) errored.\n\nFor Heroku output see:\n${output_stream_url}`,
        )
      } catch (e) {
        console.error(
          `Could not get app build for app id ${appId}, commit: ${commit}, ${e}`,
        )
      }

      throw new pRetry.AbortError(
        `Review app errored: (appId: ${appId}) ${message}`,
      )
    }

    if (status !== REVIEW_APP_STATUSES.created) {
      const appIdOutput =
        status === REVIEW_APP_STATUSES.creating ? `, appId: ${appId}` : ''

      throw new Error(
        `Review app not created yet. Current status: ${status}${appIdOutput}`,
      )
    }

    console.log('HEROKU LOG:', data)

    return app.id
  }

  return pRetry(checkForCreatedStatus, {
    factor: RETRY_EXP_BACK_OFF_FACTOR,
    retries: NUM_RETRIES,
    minTimeout,
    onFailedAttempt: err => {
      const { attemptNumber, message } = err
      console.error(`${attemptNumber}/${NUM_RETRIES}: ${message}`) // eslint-disable-line no-console
    },
  })
}

const getPipelineReviewApp = async ({ pipelineId, branch }) => {
  const { data } = await fetcher(
    `${HEROKU_API_URL}/pipelines/${pipelineId}/review-apps`,
    {
      headers: getHerokuHeaders({ useReviewAppApi: true }),
    },
  )

  return (
    data &&
    data.find(({ branch: reviewAppBranch }) => reviewAppBranch === branch)
  )
}

const waitForReviewAppBuild = ({ appId, commit, minTimeout = MIN_TIMEOUT }) => {
  const checkForBuildAppId = async () => {
    const build = await getHerokuBuild({ appId, commit })

    if (!build) {
      throw new Error(
        `No review app build found for app id '${appId}';, commit '${commit}'`,
      )
    }

    const { status, output_stream_url } = build
    if (status === BUILD_STATUSES.failed) {
      throw new pRetry.AbortError(
        `Review app build failed, appId: ${appId}, commit: ${commit}.\n\nFor Heroku output see:\n${output_stream_url}`,
      )
    }

    if (status !== BUILD_STATUSES.succeeded) {
      throw new Error(
        `Review app build for app id '${appId}' (commit '${commit}') status: ${status}`,
      )
    }

    return build
  }

  return pRetry(checkForBuildAppId, {
    factor: RETRY_EXP_BACK_OFF_FACTOR,
    retries: NUM_RETRIES,
    minTimeout,
    onFailedAttempt: err => {
      const { attemptNumber, message } = err
      console.error(`${attemptNumber}/${NUM_RETRIES}: ${message}`)
    },
  })
}

const getReviewApp = async ({ pipelineId, branch, commit }) => {
  if (!pipelineId || !branch || !commit) {
    const error = new Error('REQUIRED:')
    error.data = { pipelineId, branch, commit }

    console.error(error)

    return
  }

  const pipelineReviewApp = await getPipelineReviewApp({
    pipelineId,
    branch,
  })

  if (!pipelineReviewApp) {
    return
  }

  console.info(`USING BRANCH: ${branch}`)

  const appId = await waitTillReviewAppCreated({
    appId: pipelineReviewApp.id,
    commit,
  })

  const build = await waitForReviewAppBuild({ appId, commit })
  const app = await getHerokuApp(appId)

  return [app, build]
}

const saveReviewApp = async ({ pipelineId, repo, branch, commit }) => {
  const { data } = await fetcher(`${HEROKU_API_URL}/review-apps`, {
    headers: getHerokuHeaders({ useReviewAppApi: true }),
    method: 'post',
    body: JSON.stringify({
      pipeline: pipelineId,
      branch,
      source_blob: {
        url: await getGithubArchiveUrl({
          repo,
          branch,
        }),
        version: commit,
      },
    }),
  })

  if (!data) {
    return
  }

  return await getReviewApp({ pipelineId, branch, commit })
}

;(async () => {
  // return console.info(`process.env`, {
  //   HEROKU_API_KEY,
  //   HEROKU_PIPELINE,
  //   GITHUB_PULL_REQUEST_HEAD_SHA,
  //   GITHUB_REPOSITORY,
  //   GITHUB_TOKEN,
  //   GITHUB_HEAD_REF,
  // })

  if (
    !HEROKU_PIPELINE ||
    !GITHUB_HEAD_REF ||
    !GITHUB_REPOSITORY ||
    !GITHUB_PULL_REQUEST_HEAD_SHA
  ) {
    console.error('REQUIRED:', {
      GITHUB_PULL_REQUEST_HEAD_SHA,
      GITHUB_REPOSITORY,
      GITHUB_HEAD_REF,
      HEROKU_PIPELINE,
    })
    process.exit(1)
  }

  const pipeline = await getPipeline(HEROKU_PIPELINE)
  if (!pipeline) {
    console.error('EMPTY:', { pipeline, HEROKU_PIPELINE })
    process.exit(1)
  }

  const payload = {
    pipelineId: pipeline.id,
    branch: GITHUB_HEAD_REF,
    commit: GITHUB_PULL_REQUEST_HEAD_SHA,
  }

  const [app, build] =
    (await getReviewApp(payload)) ||
    (await saveReviewApp({
      repo: GITHUB_REPOSITORY.includes('/')
        ? GITHUB_REPOSITORY.split('/')[1]
        : GITHUB_REPOSITORY,
      ...payload,
    })) ||
    []

  if (!build || !app) {
    console.error('EMPTY:', { build, app })
    process.exit(1)
  }

  {
    const response = await fetch(build.output_stream_url)
    console.info(`OUTPUT STREAM:\n`, await response.text())
  }

  const { web_url: HEROKU_REVIEW_APP_URL, id } = app

  console.info('REVIEW APP:', {
    id,
    HEROKU_REVIEW_APP_URL,
  })

  actions.exportVariable('HEROKU_REVIEW_APP_URL', HEROKU_REVIEW_APP_URL)
})()
