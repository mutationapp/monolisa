import getUsers from './getUsers'
import { userType } from 'monolisa.model'
import Knex from 'knex'
import { filterPayloadType } from '../utils'

export type getUsersType = (
  context: Knex,
) => (filter: filterPayloadType<userType>) => Promise<userType[] | undefined>

export default getUsers
