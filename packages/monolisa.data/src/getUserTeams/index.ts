import getUserTeams from './getUserTeams'
import { teamUserType } from 'monolisa.model'
import Knex from 'knex'

export type getUserTeamsType = (
  context: Knex,
) => (userId: string) => Promise<Array<teamUserType> | undefined>
export default getUserTeams
