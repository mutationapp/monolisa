import { userTeamType } from 'monolisa.model'
import { deleteUserTeamType } from '.'

const deleteUserTeam: deleteUserTeamType = context => async userTeam => {
  await context.table<userTeamType>('userTeams').where(userTeam).delete()
}

export default deleteUserTeam
