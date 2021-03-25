import deleteTeam from './deleteTeam'
import Knex from 'knex'

export type deleteTeamType = (
  context: Knex,
) => (teamId: string) => Promise<void>

export default deleteTeam
