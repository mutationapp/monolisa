import { saveUserTeamType } from '.'
import { userTeamType, availableRoles } from 'monolisa.model'
import { withQuery } from '../utils'
import { DbValidationError } from 'monolisa.lib/error'
import { mergeUndefinedtoNull } from 'monolisa.lib/utils/object'

const saveUserTeam: saveUserTeamType = context => async userTeam => {
  const { role, userId, teamId } = userTeam || {}

  if (!userId || !teamId) {
    throw new DbValidationError(
      'REQUIRED:',
      mergeUndefinedtoNull({
        userId,
        teamId,
      }),
    )
  }

  if (!availableRoles.includes(role)) {
    throw new DbValidationError('"role" is not valid', {
      role,
    })
  }

  const userTeamsQuery = withQuery<userTeamType>(context)('userTeams')

  const userTeamQuery = () =>
    userTeamsQuery().where('teamId', teamId).andWhere('userId', userId)

  const current = await userTeamQuery().first()

  if (current) {
    role !== current.role &&
      (await userTeamQuery().update({
        role,
      }))

    return { ...current, role }
  }

  await userTeamsQuery().insert({
    role,
    teamId,
    userId,
  })

  return await userTeamQuery().first()
}

export default saveUserTeam
