import getTeamMembers from './getTeamMembers'
import { teamMemberType } from 'monolisa.model'
import Knex from 'knex'
import { getTeam } from '..'

export type getTeamMembersType = (
  context: Knex,
) => (inject: {
  getTeam: typeof getTeam
}) => (payload: {
  teamId: string
  userIdIn?: string[]
}) => Promise<teamMemberType[] | undefined>
export default getTeamMembers
