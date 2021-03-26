import { cache } from '../../middlewares'
import { getMember } from '../../shared'
import { apiRouteType } from '..'
import { getBlob } from 'monolisa.integration'
import { somethingWentWrong } from 'monolisa.lib'

import {
  getIntegration,
  getImport,
  saveImport,
  resetImport,
  deleteRepository,
  getInstallation,
} from 'monolisa.data'

import {
  unAuthorized,
  invalid,
  ok,
  notFound,
  internalError,
} from 'monolisa.lib/api'

import { integrationProviderType, isOwner } from 'monolisa.model'

import { getRepository } from 'monolisa.data'

import { decrypt } from 'monolisa.lib/rsa'

const rootPath = '/api/jobs'
const withRepoPath = rootPath + '/:provider(github)/:owner/:repo'

const repositoryRoute: apiRouteType = ({ server, auth }) => {
  server.get(
    `${withRepoPath}/import`,
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        return unAuthorized(response)
      }

      const { repo, owner, provider } = request.params

      const integrationPayload = {
        userId: member.id,
        provider: provider as integrationProviderType,
      }

      const integration = await getIntegration(integrationPayload)

      if (!integration) {
        return notFound(response, { data: { integrationPayload } })
      }

      const importPayload = {
        repo,
        owner,
        integrationId: integration.id,
      }

      const importItem = await getImport(importPayload)

      if (!importItem) {
        return notFound(response, { data: { importPayload } })
      }

      return ok(response, importItem)
    },
  )
  server.get(
    `${withRepoPath}/:mergeCommitSha/blob/:path([^/]*)?`,
    auth(),
    cache(),
    async (request, response) => {
      const member = getMember({ request })

      const {
        owner,
        repo,
        mergeCommitSha,
        path,
        provider,
      } = request.params as {
        owner: string
        repo: string
        mergeCommitSha: string
        path: string
        provider: integrationProviderType
      }

      const installation = await getInstallation({ login: owner, provider })

      if (!installation) {
        return notFound(response)
      }

      const integration = member?.integrations?.find(
        i => i.provider === provider,
      )

      const token = integration?.accessToken || installation.accessToken
      if (!token) {
        return unAuthorized(response)
      }

      const blob = await getBlob({
        auth: decrypt(token),
        repo,
        owner,
        ref: mergeCommitSha,
        path,
      })

      if (!blob) {
        return notFound(response)
      }

      return ok(response, blob)
    },
  )

  server.delete(withRepoPath, auth(true), async (request, response) => {
    const member = getMember({ request })
    if (!member) {
      return unAuthorized(response)
    }

    const { owner, repo, provider } = request.params as {
      owner: string
      repo: string
      provider: integrationProviderType
    }

    const installation = member.installations?.find(
      i => i.login === owner && i.provider === provider,
    )

    if (!installation) {
      return unAuthorized(response)
    }

    const teamUser = (() => {
      if (!installation.teamId) {
        return
      }

      return member.teams?.find(t => t.teamId === installation.teamId)
    })()

    if (teamUser && !isOwner(teamUser)) {
      return unAuthorized(response)
    }

    const repository = await getRepository({
      owner,
      repo,
      installationId: installation.id,
    })

    if (!repository) {
      return notFound(response)
    }

    await deleteRepository(repository.id)

    return ok(response)
  })

  // import
  server.patch(rootPath, auth(true), async (request, response) => {
    const member = getMember({ request })
    if (!member) {
      return unAuthorized(response)
    }

    const provider = request.body.provider
    if (!provider) {
      return invalid(response, {
        error: 'provider is invalid',
        data: { provider },
      })
    }

    const owner = request.body.owner as string | undefined

    const installationId = request.body.installationId as string | undefined

    const installation = member.installations?.find(
      i => i.id === installationId && (!owner || i.login === owner),
    )
    if (!installation) {
      return unAuthorized(response)
    }

    const repository = request.body.repository as string
    if (!repository) {
      return invalid(response, {
        error: 'repository is required',
        data: { repository },
      })
    }

    if (
      !owner &&
      !(await getRepository({
        owner: installation.login,
        repo: repository,
        installationId: installation.id,
      }))
    ) {
      return notFound(response)
    }

    const payload = {
      repo: repository,
      owner: installation.login,
      installationId: installation.id,
    }

    const reset = request.body.reset as string | undefined

    const item = reset
      ? await resetImport(reset)
      : (await getImport(payload)) || (await saveImport(payload))

    if (!item) {
      return internalError(response, {
        error: somethingWentWrong,
        data: { payload },
      })
    }

    const data: { token: string } = { token: item.key }
    return ok(response, data)
  })
}

export default repositoryRoute
