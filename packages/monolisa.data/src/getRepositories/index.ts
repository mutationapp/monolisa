import getRepositories from './getRepositories'
import { repositoryType } from 'monolisa.model'
import Knex from 'knex'
import { filterPayloadType } from '../utils'

export type getRepositoriesType = (
  inject: Knex,
) => (
  payload: filterPayloadType<repositoryType>,
) => Promise<repositoryType[] | undefined>

export default getRepositories
