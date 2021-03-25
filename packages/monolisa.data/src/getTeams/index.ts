import getTeams from './getTeams'
import { teamType } from 'monolisa.model'
import Knex from 'knex'

export type getTeamsType = (
  context: Knex,
) => (payload: Partial<teamType>) => Promise<teamType[] | undefined>
export default getTeams
