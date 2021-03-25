import { getTeam, saveUserTeam } from '..'
import { teamBaseType, teamType } from 'monolisa.model'

import saveTeam from './saveTeam'
import Knex from 'knex'

export type saveTeamType = (
  context: Knex,
) => (inject: {
  getTeam: typeof getTeam
  saveUserTeam: typeof saveUserTeam
}) => (
  team: teamBaseType & {
    createdBy: string
  },
) => Promise<teamType | undefined>

export default saveTeam
