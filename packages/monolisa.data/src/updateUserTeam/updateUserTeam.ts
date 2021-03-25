import { withQuery } from '../utils'
import { userTeamType } from 'monolisa.model'
import { updateUserTeamType } from '.'

const updateUserTeam: updateUserTeamType = context => async userTeam => {
  const { userId, teamId, role } = userTeam

  const query = withQuery<userTeamType>(context)('userTeams')

  const find = { userId, teamId }

  await query().where(find).update({
    role,
  })

  return query().where(find).first()
}

export default updateUserTeam
