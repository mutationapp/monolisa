import { getTeamMembersType } from '.'
import { userTeamType, userType, teamMemberType } from 'monolisa.model'

export const getTeamMembers: getTeamMembersType = context => ({
  getTeam,
}) => async ({ teamId, userIdIn }) => {
  const team = await getTeam({ id: teamId })

  if (!team) {
    return
  }

  const query = context.table<userTeamType>('userTeams').where('teamId', teamId)

  userIdIn?.length && query.whereIn('userId', userIdIn)

  const teamUsers = await query

  if (!teamUsers.length) {
    return
  }

  const users = await context.table<userType>('users').whereIn(
    'id',
    teamUsers.map(x => x.userId),
  )

  return users.reduce<teamMemberType[]>((result, u) => {
    const teamUser = teamUsers.find(x => x.userId === u.id)
    if (!teamUser) {
      return result
    }

    const { email, name, slug } = u
    const { role } = teamUser

    return result.concat({
      ...teamUser,
      teamSlug: team.slug,
      teamCreatedBy: team.createdBy,
      role,
      email,
      name,
      slug,
    })
  }, [])
}

export default getTeamMembers
