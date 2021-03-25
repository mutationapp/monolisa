import { userType } from 'monolisa.model'

import updateUser from './updateUser'
import Knex from 'knex'

export type updateUserType = (
  context: Knex,
) => (user?: userType) => Promise<userType | undefined>

export default updateUser
