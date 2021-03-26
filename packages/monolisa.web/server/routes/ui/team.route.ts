import {
  render,
  routeBaseType,
  renderNotFound,
  renderError,
  renderUnauthorized,
} from '../index'

import {
  getUserTeam,
  getTeam,
  saveUserTeam,
  getTeamMembers,
} from 'monolisa.data'
import { getMember } from '../../shared'
import { buildQuery } from 'monolisa.lib/utils/url'
import { defaultTeamSize } from 'monolisa.model'

const teamRoute: routeBaseType = ({ server, app, auth }) => {
  server.get(
    '/teams/invite/:invitationKey',
    auth(),
    async (request, response) => {
      const invitationKey = request.params.invitationKey as string

      const team = await getTeam({ invitationKey })
      if (!team) {
        return renderNotFound(app, request, response)
      }

      const member = getMember({ request })

      if (!member) {
        return response.redirect(
          `/login?${buildQuery({
            invitationKey,
          })}`,
        )
      }

      const userTeam = await getUserTeam({
        userId: member.id,
        teamId: team.id,
      })

      if (userTeam) {
        return response.redirect(
          `/teams/${team.slug}?${buildQuery({
            invitationKey,
          })}`,
        )
      }

      const members = await getTeamMembers({ teamId: team.id })

      const size = team.size || defaultTeamSize
      const seats = members?.length || 0

      const needsResize = seats >= size

      if (needsResize) {
        return renderUnauthorized(app, request, response)
      }

      if (
        !(await saveUserTeam({
          userId: member.id,
          teamId: team.id,
          role: 'Member',
        }))
      ) {
        return renderError(app, request, response)
      }

      return response.redirect(
        `/teams/${team.slug}?${buildQuery({
          invitationKey,
        })}`,
      )
    },
  )
  server.get(
    ['', '/:slug'].map(route => `${route}/teams/:section(new)?`),
    auth(),
    async (request, response) => {
      const { section } = request.params

      return render(
        app,
        request,
        response,
      )(`/teams${section ? `/${section}` : ''}`)
    },
  )

  server.get(
    '/teams/:teamSlug/:section(settings|installations|import)?',
    auth(),
    async (request, response) => {
      const { section } = request.params

      return render(app, request, response)(`/teams/${section || 'profile'}`)
    },
  )
}

export default teamRoute
