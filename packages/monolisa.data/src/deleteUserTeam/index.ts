import deleteUserTeam from './deleteUserTeam'
import Knex from 'knex'

export type deleteUserTeamType = (
  context: Knex,
) => (payload: { userId: string; teamId: string }) => Promise<void>

export default deleteUserTeam
