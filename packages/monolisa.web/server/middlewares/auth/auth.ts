import withContext from '../../shared/withContext'

import { allNotNil } from 'monolisa.lib/utils/object'
import { authType } from '.'
import { unAuthorized, notAllowed, notFound } from 'monolisa.lib/api'
import { parseCookie } from 'monolisa.lib/utils/cookie'
import { decodeMemberToken } from 'monolisa.model/src/tokenize'

import {
  renderUnauthorized,
  renderNotFound,
  renderNotAllowed,
  redirectUnauthorized,
} from '../../routes'

import {
  getUser,
  getIntegrations,
  getInstallations,
  getUserTeams,
  getInstallation,
  getRepository,
  getTeam,
  getUserTeam,
} from 'monolisa.data'

import {
  memberType,
  integrationProviderType,
  userType,
  teamContextPayloadType,
} from 'monolisa.model'
import { NextServer } from 'next/dist/server/next'

export const getUserDetails = async (key: string) => {
  const user = await getUser({ key })
  if (!user) {
    return
  }

  const userId = user.id

  const integrations = await getIntegrations({ userId })

  const installations = (await getInstallations(userId))?.filter(i =>
    integrations?.some(integration => integration.provider === i.provider),
  )

  const teams = await getUserTeams(userId)

  return {
    ...user,
    integrations,
    installations,
    teams,
  } as memberType
}

const auth: (inject?: { app?: NextServer }) => authType = ({ app } = {}) => (
  authorize,
  redirect,
) => async (request, response, next) => {
  const { token } = parseCookie(request.headers.cookie) || {}
  const member = await (async () => {
    const key = decodeMemberToken(token)
    if (!key) return

    return await getUserDetails(key)
  })()

  const to = redirect?.(member)

  // const getUnauthorized = () =>
  //   app
  //     ? to
  //       ? response.redirect(to)
  //       : renderUnauthorized(app, request, response)
  //     : unAuthorized(response)

  const getUnauthorized = () =>
    app
      ? member
        ? renderUnauthorized(app, request, response)
        : redirectUnauthorized(request, response, to)
      : unAuthorized(response)

  const getNotAllowed = () =>
    app
      ? to
        ? response.redirect(to)
        : renderNotAllowed(app, request, response)
      : notAllowed(response)

  const getNotFound = () =>
    app ? renderNotFound(app, request, response) : notFound(response)

  if (!member && authorize === true) {
    return getUnauthorized()
  }

  if (member && authorize === false) {
    return getNotAllowed()
  }

  const {
    owner,
    repo,
    provider,
    teamSlug,
    slug: userSlug,
  } = request.params as {
    provider?: integrationProviderType
    repo?: string
    owner?: string
    teamSlug?: string
    slug?: string
  }

  const isInstallation = allNotNil({
    owner,
    provider,
    repo,
  })

  const installation = isInstallation
    ? await getInstallation({ login: owner, provider })
    : undefined

  if (isInstallation && !installation) {
    return getNotFound()
  }

  const repository = installation
    ? await getRepository({
        owner,
        repo,
        installationId: installation.id,
      })
    : undefined

  if (installation && !repository) {
    return getNotFound()
  }

  const isMemberInstallation =
    member && installation && installation.userId === member.id

  if (!isMemberInstallation && repository?.private) {
    return getUnauthorized()
  }

  const user =
    installation && installation.userId
      ? isMemberInstallation
        ? member
        : await getUser({ id: installation.userId })
      : userSlug
      ? await getUser({ slug: userSlug })
      : member

  if ((userSlug || installation?.userId) && !user) {
    return getNotFound()
  }

  const team =
    installation && installation.teamId
      ? await getTeam({ id: installation.teamId })
      : teamSlug
      ? await getTeam({ slug: teamSlug })
      : undefined

  if ((teamSlug || installation?.teamId) && !team) {
    return getNotFound()
  }

  withContext({ request }).set({
    user: user
      ? ({
          email: user.email,
          name: user.name,
          slug: user.slug,
          id: user.id,
        } as userType)
      : undefined,
    member,
    team: team
      ? ({
          id: team.id,
          name: team.slug,
          size: team.size,
          installations: await getInstallations({ teamId: team.id }),
          teamMember: member
            ? await getUserTeam({ userId: member.id, teamId: team.id })
            : undefined,
        } as teamContextPayloadType)
      : undefined,
    repository,
    installation,
  })

  next()
}

export default auth
