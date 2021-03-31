import fetch from 'isomorphic-unfetch'
import getAppInstallation from '../../shared/getAppInstallation'

import { routeBaseType, render } from '../index'
import { federate } from '../../middlewares'
import { somethingWentWrong } from 'monolisa.lib'
import { parseCookie } from 'monolisa.lib/utils/cookie'
import { withInstallationCookie, withStateCookie } from './installation.route'
import { buildQuery, parseQuery } from 'monolisa.lib/utils/url'
import { getEnv } from 'monolisa.lib/env'
import { encrypt } from 'monolisa.lib/rsa'
import { loginResponseType } from '../../shared'
import { defaultTeamSize } from 'monolisa.model'

import {
  signMemberToken,
  decodeProviderStateToken,
} from 'monolisa.model/src/tokenize'

import {
  getIntegration,
  getUser,
  saveIntegration,
  saveUser,
  updateIntegration,
  getUserTeam,
  getInstallation,
  saveInstallation,
  saveTeam,
  getTeam,
  saveUserTeam,
  getTeamMembers,
} from 'monolisa.data'

export const withMemberCookie = (request, response) => ({
  set: (value?: string) => {
    response.cookie('token', value ? signMemberToken(value) : '')
  },
  get: () => {
    const { token } = parseCookie(request.headers.cookie) || {}

    return token
  },
})

const loginRoute: routeBaseType = ({ server, app, auth }) => {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = getEnv()

  // y {
  //   code: 'ec0e58f931879c737b76',
  //   installation_id: '10264923',
  //   setup_action: 'install'
  // }
  server.get(
    '/authorize',
    federate(app, 'state'),
    async (request, response) => {
      const installationCookie = withInstallationCookie(request, response)
      const memberCookie = withMemberCookie(request, response)
      const stateCookie = withStateCookie(request, response)

      const clearFederate = () => {
        installationCookie.set({ teamSlug: undefined })
        stateCookie.set(null)
      }

      const withError = (error: string) => {
        installationCookie.set({ teamSlug: undefined })
        return response.redirect('/jobs?error=' + error)
      }

      const provider = 'github'

      const query = request.query as {
        [key: string]: string
      }

      const { code } = query

      const state = query.state
        ? decodeProviderStateToken(query.state)
        : undefined

      const { invitationKey, returnUrl } = state
        ? parseQuery(state)
        : {
            invitationKey: undefined,
            returnUrl: undefined,
          }

      if (!code) {
        return withError('code from provider is empty.')
      }

      const accessToken = await (async () => {
        const githubResponse = await fetch(
          `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          },
        )

        if (!githubResponse.ok) {
          console.warn('Github response was not ok', query)
          return
        }

        const result = await githubResponse.json()

        return result.access_token
      })()

      if (!accessToken) {
        return withError('Access token not found')
      }

      const githubUser = await (async () => {
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            Accept: 'application/json',
            Authorization: 'token ' + accessToken,
          },
        })

        return await userResponse.json()
      })()

      if (!githubUser) {
        return withError('githubUser')
      }

      const { login: userName, ...rest } = githubUser
      const providerUserId = '' + rest.id

      const email = rest.email || Math.random().toString()
      const name = rest.name || Math.random().toString()

      const currentIntegration =
        (await getIntegration({ accessToken: encrypt(accessToken) })) ||
        (await getIntegration({ providerUserId }))

      // TODO: Check email first
      const user = currentIntegration
        ? await getUser({ id: currentIntegration.userId })
        : await saveUser({
            name,
            email,
            slug: userName,
          })

      if (!user) {
        return withError('user')
      }

      const integration = currentIntegration
        ? await updateIntegration({
            ...currentIntegration,
            userName,
            email,
            accessToken,
          })
        : await saveIntegration({
            provider,
            accessToken,
            userName,
            userId: user.id,
            email,
            providerUserId,
          })

      if (!integration) {
        return withError('integration')
      }

      const { installation_id, setup_action } = query

      const installationId = (() => {
        const id = parseInt(installation_id)
        if (isNaN(id)) return

        return id
      })()

      const hasInstallation = installationId && setup_action === 'install'

      const integrationInstallation = await (async () => {
        if (!hasInstallation || !installationId) return

        return await getAppInstallation(installationId)
      })()

      if (hasInstallation && !integrationInstallation) {
        console.warn('Can not find installation for:', request.query)

        return withError(somethingWentWrong)
      }

      const installation = await (async () => {
        if (!integrationInstallation) {
          return
        }

        const { installationId } = integrationInstallation

        return await getInstallation({
          providerInstallationId: installationId.toString(),
          provider,
        })
      })()

      const { teamSlug } = installationCookie.get()

      const teamMember = await (async () => {
        if (teamSlug) {
          return await getUserTeam({ userId: integration.userId, teamSlug })
        }

        if (!integrationInstallation) {
          if (!invitationKey) {
            return
          }

          const team = await getTeam({ invitationKey })
          if (!team) {
            return
          }

          const userTeam = await getUserTeam({
            userId: user.id,
            teamId: team.id,
          })

          if (userTeam) {
            return userTeam
          }

          const members = await getTeamMembers({ teamId: team.id })

          const size = team.size || defaultTeamSize
          const seats = members?.length || 0

          const needsResize = seats >= size

          if (needsResize) {
            return
          }

          await saveUserTeam({
            userId: user.id,
            teamId: team.id,
            role: 'Member',
          })

          return await getUserTeam({
            userId: user.id,
            teamId: team.id,
          })
        }

        const { login } = integrationInstallation

        if (integration.userName === login) {
          return
        }

        const currentTeam = await getTeam({ slug: login })
        if (currentTeam) {
          return await getUserTeam({
            userId: integration.userId,
            teamSlug: currentTeam.slug,
          })
        }

        await saveTeam({
          slug: login,
          createdBy: integration.userId,
        })

        return await getUserTeam({
          userId: user.id,
          teamSlug: login,
        })
      })()

      if (teamSlug && !teamMember) {
        return withError('teamSlug && !teamMember')
      }

      if (integrationInstallation) {
        const { login, installationId } = integrationInstallation

        if (!teamMember && login !== integration.userName) {
          return withError('!teamMember && login !== integration.userName')
        }

        await saveInstallation({
          ...installation,
          login,
          provider,
          teamId: teamMember ? teamMember.teamId : undefined,
          userId: teamMember ? undefined : user.id,
          providerInstallationId: installationId.toString(),
        })
      }

      clearFederate()
      memberCookie.set(user.key)

      if (returnUrl) {
        return response.redirect(returnUrl)
      }

      return response.redirect(
        teamMember
          ? `/teams/${teamMember.teamSlug}${
              invitationKey
                ? `?${buildQuery({
                    invitationKey,
                  })}`
                : ''
            }`
          : `/${user.slug}`,
      )
    },
  )

  server.get(
    '/login',
    auth(false, member => (member ? `/${member.slug}` : undefined)),
    async (request, response) => {
      const invitationKey = request.query.invitationKey as string | undefined

      const renderLogin = () => render(app, request, response)('/login')
      if (!invitationKey) {
        return renderLogin()
      }

      const team = invitationKey ? await getTeam({ invitationKey }) : undefined

      const teamInfo = await (async () => {
        if (!team) return

        const members = await getTeamMembers({ teamId: team.id })

        return {
          teamSize: team.size?.toString(),
          teamSeats: members?.length.toString(),
          teamSlug: team.slug,
        }
      })()
      return render<loginResponseType>(
        app,
        request,
        response,
      )('/login', { ...teamInfo, teamInvitationKey: invitationKey })
    },
  )
}

export default loginRoute
