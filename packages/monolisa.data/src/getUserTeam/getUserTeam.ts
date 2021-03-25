import { getuserTeamType } from '.'
import { userTeamType } from 'monolisa.model'
import { AppError } from 'monolisa.lib/error'

export const getUserTeam: getuserTeamType = context => ({ getTeam }) => async ({
  userId,
  teamSlug,
  teamId,
}) => {
  if (!teamId && !teamSlug) {
    throw new AppError('One of them required:', { teamSlug, teamId })
  }

  if (!userId) {
    console.error('REQUIRED.', {
      userId,
    })
    return
  }

  const team = teamId
    ? await getTeam({ id: teamId })
    : await getTeam({ slug: teamSlug })

  if (!team) {
    return
  }

  const userTeam = await context
    .table<userTeamType>('userTeams')
    .where('userId', userId)
    .andWhere('teamId', team.id)
    .first()

  if (!userTeam) {
    return
  }

  return { ...userTeam, teamSlug: team.slug, teamCreatedBy: team.createdBy }
}

export default getUserTeam
