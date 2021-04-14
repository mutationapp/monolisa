import { mergeUndefinedtoNull } from 'monolisa.lib/utils/object'
import { DbValidationError } from 'monolisa.lib/error'
import {
  getMember,
  teamPayloadType,
  teamInvitationPayloadType,
  teamsPayloadType,
  teamMemberPayloadType,
} from '../../shared'
import { teamBaseType, roleType, isOwner, availableRoles } from 'monolisa.model'
import { apiRouteType } from '..'
import { mapInstallation } from '../../shared/map'

import {
  getUserTeams,
  saveTeam,
  getTeam,
  getRepositories,
  resetInvitationKey,
  getTeamMembers,
  updateUserTeam,
  deleteUserTeam,
  deleteTeam,
  getInstallations,
} from 'monolisa.data'

import {
  unAuthorized,
  ok,
  invalid,
  created,
  internalError,
  notFound,
} from 'monolisa.lib/api'

const teamRoute: apiRouteType = ({ server, auth, whenFeature }) => {
  server.get('/api/teams', auth(true), async (request, response) => {
    const member = getMember({ request })
    if (!member) {
      return unAuthorized(response)
    }

    const teams = await getUserTeams(member.id)

    return ok<teamsPayloadType>(response, { teams: teams || [] })
  })

  server.get('/api/teams/:teamSlug', auth(), async (request, response) => {
    const member = getMember({ request })
    // if (!member) {
    //   return unAuthorized(response)
    // }

    const { teamSlug } = request.params
    const team = await getTeam({ slug: teamSlug })

    if (!team) {
      return notFound(response)
    }

    const teamUser = member?.teams?.find(t => t.teamId === team.id)

    const installations = await getInstallations({ teamId: team.id })

    const repositories = installations?.length
      ? await getRepositories(
          installations.map(i =>
            teamUser
              ? { installationId: i.id }
              : { installationId: i.id, private: false },
          ),
        )
      : undefined

    return ok<teamPayloadType>(response, {
      repositories,
      teamUser,
      members:
        teamUser && isOwner(teamUser)
          ? await getTeamMembers({ teamId: teamUser.teamId })
          : undefined,
      installations: installations?.map(i => mapInstallation(i)),
    })
  })

  server.delete(
    '/api/teams/:teamSlug',
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        return unAuthorized(response)
      }

      const { teamSlug } = request.params

      const teamUser = member.teams?.find(team => team.teamSlug === teamSlug)

      if (!teamUser || !isOwner(teamUser)) {
        return unAuthorized(response)
      }

      await deleteTeam(teamUser.teamId)

      return ok(response)
    },
  )

  server.delete(
    '/api/teams/:teamSlug/members/:userId',
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        return unAuthorized(response)
      }

      const { teamSlug } = request.params

      const teamUser = member.teams?.find(team => team.teamSlug === teamSlug)

      if (!teamUser || !isOwner(teamUser)) {
        return unAuthorized(response)
      }

      const userId = request.params.userId as string

      const teamMember = (
        await getTeamMembers({
          teamId: teamUser.teamId,
          userIdIn: [userId],
        })
      )?.[0]

      if (!teamMember) {
        return notFound(response)
      }

      await deleteUserTeam({
        userId: teamMember.userId,
        teamId: teamMember.teamId,
      })

      return ok<teamMemberPayloadType>(response)
    },
  )

  server.patch(
    '/api/teams/:teamSlug/members/:userId',
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        return unAuthorized(response)
      }

      const { teamSlug } = request.params

      const teamUser = member.teams?.find(team => team.teamSlug === teamSlug)

      if (!teamUser || !isOwner(teamUser)) {
        return unAuthorized(response)
      }

      const userId = request.params.userId as string

      const getTeamMember = async () =>
        (
          await getTeamMembers({
            teamId: teamUser.teamId,
            userIdIn: [userId],
          })
        )?.[0]

      const currentTeamMember = await getTeamMember()

      if (!currentTeamMember) {
        return notFound(response)
      }

      const role = (request.body.role as roleType) || currentTeamMember.role

      if (!availableRoles.includes(role)) {
        return invalid(response, {
          data: { role },
        })
      }

      await updateUserTeam({
        userId: currentTeamMember.userId,
        teamId: currentTeamMember.teamId,
        role,
      })

      const teamMember = await getTeamMember()
      if (!teamMember) {
        return internalError(response)
      }

      return ok<teamMemberPayloadType>(response, {
        teamMember,
      })
    },
  )

  server.patch(
    '/api/teams/:teamSlug/invitations',
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        return unAuthorized(response)
      }

      const { teamSlug } = request.params

      const teamUser = member.teams?.find(team => team.teamSlug === teamSlug)

      if (!teamUser || !isOwner(teamUser)) {
        return unAuthorized(response)
      }

      const team = await getTeam({ id: teamUser.teamId })
      if (!team) {
        return unAuthorized(response)
      }

      const reset = request.body.reset as boolean | undefined

      const invitationKey = reset
        ? await resetInvitationKey(team.id)
        : team.invitationKey

      if (!invitationKey) {
        return internalError(response)
      }

      return ok<teamInvitationPayloadType>(response, {
        invitationKey,
      })
    },
  )

  server.post(
    '/api/teams',
    whenFeature({ FT_TEAM_SLUG_CREATION: 'on' }),
    auth(true),
    async (request, response) => {
      const member = getMember({ request })
      if (!member) {
        throw Error('Unauthorized')
      }

      const team = request.body as teamBaseType | undefined

      const slug = team?.slug
      if (!slug) {
        return invalid(response, {
          error: 'Slug is required.',
          data: mergeUndefinedtoNull({
            slug,
          }),
        })
      }

      const title = team?.title
      if (!title) {
        return invalid(response, {
          error: 'title is required.',
          data: mergeUndefinedtoNull({
            title,
          }),
        })
      }

      const subtitle = team?.subtitle
      if (!subtitle) {
        return invalid(response, {
          error: 'subtitle is required.',
          data: mergeUndefinedtoNull({
            subtitle,
          }),
        })
      }

      const profile = team?.profile
      if (!profile) {
        return invalid(response, {
          error: 'profile is required.',
          data: mergeUndefinedtoNull({
            profile,
          }),
        })
      }

      try {
        await saveTeam({ slug, createdBy: member.id, title, subtitle, profile })
        return created(response)
      } catch (error) {
        if (error instanceof DbValidationError) {
          return invalid(response, {
            error: error.message,
            data: error.data,
          })
        }

        return internalError(response)
      }
    },
  )
}

export default teamRoute
