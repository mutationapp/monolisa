import fileUpload from 'express-fileupload'

import { Application } from 'express'
import { postResponseType } from '.'
import { getEnv } from 'monolisa.lib/env'
import { buildQuery } from 'monolisa.lib/utils/url'
import { getRepo } from 'monolisa.integration'
import { decrypt } from 'monolisa.lib/rsa'

import {
  getIntegration,
  getRepository,
  saveRepository,
  getInstallation,
  getImport,
  getUserTeam,
  saveUserTeam,
  getTeam,
} from 'monolisa.data'

import {
  unAuthorized,
  invalid,
  internalError,
  ok,
  notFound,
  forbidden,
} from 'monolisa.lib/api'

const { MUTATE_APP_URL } = getEnv()

export default (server: Application) => {
  server.post('/', async (request, response) => {
    const repositoryToken = request.body.repositoryToken as string | undefined
    if (!repositoryToken) {
      return invalid(response, {
        error: "'repositoryToken' filed is invalid.",
        data: { repositoryToken },
      })
    }

    const { files } = request
    if (!files) {
      return invalid(response, {
        error: 'Files are missing.',
        data: { files },
      })
    }

    const file = files.file as fileUpload.UploadedFile
    if (!file?.data) {
      return invalid(response, {
        error: 'File is invalid.',
        data: { file },
      })
    }

    const imprt = await getImport({ key: repositoryToken })
    if (!imprt) {
      return notFound(response)
    }

    const { installationId, owner, repo } = imprt

    const installation = await getInstallation({
      id: installationId,
      login: owner,
    })

    if (!installation) {
      return notFound(response, {
        error: 'Installation not found',
        data: {
          repositoryToken,
        },
      })
    }

    const pullNumber = parseInt(request.body.pullNumber)
    if (isNaN(pullNumber)) {
      return invalid(response, {
        error: 'pullNumber',
        data: { pullNumber },
      })
    }

    const pullOwner = request.body.pullOwner
    if (!pullOwner) {
      return invalid(response, {
        error: 'pullNumber',
        data: { pullOwner },
      })
    }

    const integration = await getIntegration({
      provider: installation.provider,
      userName: pullOwner,
    })

    const withRepoOwner = {
      repo,
      owner,
    }

    const { providerInstallationId } = installation

    if (!integration) {
      const info = `@${pullOwner} please login from [here](${MUTATE_APP_URL}/login?${buildQuery(
        {
          ...withRepoOwner,
          pullOwner,
          pullNumber,
          providerInstallationId,
        },
      )}) to continue, we will get details from ${
        installation.provider
      } on behalf of you.`

      return unAuthorized(response, {
        error: info,
      })
    }

    const { userId } = integration

    const getRepoPayload = {
      ...withRepoOwner,
      auth: decrypt(integration.accessToken),
    }

    const providerRepository = await getRepo(getRepoPayload)

    if (!providerRepository) {
      return forbidden(response, {
        error: 'Repository is not available for the user.',
        data: {
          repo: providerRepository,
        },
      })
    }

    const { teamId } = installation

    const team = await (async () => {
      if (!teamId) return

      return await getTeam({ id: teamId })
    })()

    if (teamId && !team) {
      return notFound(response, {
        data: {
          teamId,
        },
      })
    }

    const teamMember = await (async () => {
      if (!teamId) return

      return await getUserTeam({
        userId,
        teamId,
      })
    })()

    if (team && !teamMember) {
      const { id: teamId } = team

      await saveUserTeam({
        userId,
        teamId,
        role: 'Member',
      })
    }

    const getRepositoryPayload = {
      ...withRepoOwner,
      installationId,
    }

    const repository =
      (await getRepository(getRepositoryPayload)) ||
      (await saveRepository({
        ...getRepositoryPayload,
        private: providerRepository.private,
      }))

    if (!repository) {
      return internalError(response, {
        data: {
          error: 'Repository can not processed',
          payload: getRepositoryPayload,
        },
      })
    }

    return ok<postResponseType>(response, {
      info: 'info',
      url: 'url',
      reviewCommentUrl: 'reviewCommentUrl',
    })
  })
}
