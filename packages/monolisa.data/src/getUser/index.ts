import getUser from './getUser'
import { userType } from 'monolisa.model'
import Knex from 'knex'

export type getUserType = (
  context: Knex,
) => (filter: Partial<userType>) => Promise<userType | undefined>

export default getUser
