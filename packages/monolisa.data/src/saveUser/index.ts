import { userBaseType, userType } from 'monolisa.model'

import saveUser from './saveUser'
import Knex from 'knex'

export type saveUserType = (
  context: Knex,
) => (user?: userBaseType) => Promise<userType | undefined>

export default saveUser
