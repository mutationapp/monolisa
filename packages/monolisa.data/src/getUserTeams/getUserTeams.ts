import { getUserTeamsType } from '.'
import { teamType, userTeamType, teamUserType } from 'monolisa.model'

export const getUserTeams: getUserTeamsType = context => async userId => {
  if (!userId) {
    console.error('userId is required.', {
      userId,
    })
    return
  }

  const userTeams = await context
    .table<userTeamType>('userTeams')
    .where('userId', userId)

  if (!userTeams.length) {
    return
  }

  const teams = await context.table<teamType>('teams').whereIn(
    'id',
    userTeams.map(userTeam => userTeam.teamId),
  )

  return userTeams.reduce<teamUserType[]>((result, userTeam) => {
    const team = teams.find(team => team.id === userTeam.teamId)

    if (!team) return result

    return result.concat({
      ...userTeam,
      teamSlug: team.slug,
      teamCreatedBy: team.createdBy,
    })
  }, [])
}

export default getUserTeams
