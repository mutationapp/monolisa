import { userTeamType } from 'monolisa.model'

import updateUserTeam from './updateUserTeam'
import Knex from 'knex'

export type updateUserTeamType = (
  context: Knex,
) => (userTeam: userTeamType) => Promise<userTeamType | undefined>

export default updateUserTeam
