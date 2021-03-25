import getUserTeam from './getUserTeam'
import { teamUserType } from 'monolisa.model'
import Knex from 'knex'
import { getTeam } from '..'

export type getuserTeamType = (
  context: Knex,
) => (inject: {
  getTeam: typeof getTeam
}) => (payload: {
  userId: string
  teamSlug?: string
  teamId?: string
}) => Promise<teamUserType | undefined>
export default getUserTeam
