import { getTeam } from '..'
import { teamType } from 'monolisa.model'

import updateTeam from './updateTeam'
import Knex from 'knex'

export type updateTeamType = (
  context: Knex,
) => (inject: {
  getTeam: typeof getTeam
}) => (team: teamType) => Promise<teamType | undefined>

export default updateTeam
