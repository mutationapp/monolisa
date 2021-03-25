import {
  getInstallations,
  getIntegration,
  getUserTeam,
  saveInstallation,
} from 'monolisa.data'

import { getMember, installationPayloadType } from '../../shared'
import { apiRouteType } from '..'
import { unAuthorized, ok, notAllowed } from 'monolisa.lib/api'
import { listRepos } from 'monolisa.integration'
import { integrationProviderType, repoType } from 'monolisa.model'
import { decrypt } from 'monolisa.lib/rsa'

const integrationRoute: apiRouteType = ({ server, auth }) => {
  server.get(
    [
      '/api/teams/:teamSlug/installations/:installationId',
      '/api/installations/:installationId',
    ],
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        return unAuthorized(response)
      }

      const installations = await getInstallations(member.id)
      if (!installations?.length) {
        return notAllowed(response)
      }

      const teamSlug = request.params.teamSlug as string | undefined
      const team = teamSlug
        ? await getUserTeam({ userId: member.id, teamSlug })
        : undefined

      if (teamSlug && !team) {
        return notAllowed(response, {
          data: { teamSlug },
        })
      }

      const { scope } = request.query
      const include =
        typeof scope === 'string' ? scope.split(',').filter(Boolean) : undefined

      const { installationId } = request.params as {
        installationId: string | integrationProviderType
      }

      const isProvider = ['github'].includes(installationId)

      let installation = installations
        .filter(installation =>
          isProvider
            ? installation.provider === installationId
            : installation.id === installationId,
        )
        .filter(installation =>
          team ? installation.teamId === team.teamId : true,
        )
        .find(installation =>
          isProvider && !team ? installation.userId === member.id : true,
        )

      if (!installation) {
        return ok<installationPayloadType>(response, {})
      }

      const integration = await getIntegration({
        userId: member.id,
        provider: installation.provider,
      })

      if (!integration) {
        return notAllowed(response)
      }

      const accessToken = decrypt(integration.accessToken)

      const includeRepos = include?.includes('repos')

      let repos: repoType[] | undefined
      if (includeRepos) {
        try {
          repos = await listRepos(
            accessToken,
            +installation.providerInstallationId,
          )
        } catch (error) {
          console.warn(`ERROR:`, error)
        } finally {
          if (installation.userId === member.id) {
            installation = await saveInstallation({
              ...installation,
              revokedAt: null,
            })
            // if (repos && installation.revokedAt) {
            //   installation = await saveInstallation({
            //     ...installation,
            //     revokedAt: null,
            //   })
            // } else if (!repos && !installation.revokedAt) {
            //   installation = await saveInstallation({
            //     ...installation,
            //     revokedAt: new Date(),
            //   })
            // }
          }
        }
      }

      return ok<installationPayloadType>(response, {
        installation,
        integration,
        repos,
      })
    },
  )
}

export default integrationRoute
