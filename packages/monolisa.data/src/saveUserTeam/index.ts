import { userTeamType } from 'monolisa.model'

import saveUserTeam from './saveUserTeam'
import Knex from 'knex'

export type saveUserTeamType = (
  context: Knex,
) => (userTeam: userTeamType) => Promise<userTeamType | undefined>

export default saveUserTeam
