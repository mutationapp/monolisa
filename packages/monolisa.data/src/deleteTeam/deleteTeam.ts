import { teamType } from 'monolisa.model'
import { deleteTeamType } from '.'

const deleteTeam: deleteTeamType = context => async teamId => {
  await context.table<teamType>('teams').where('id', teamId).delete()
}

export default deleteTeam
