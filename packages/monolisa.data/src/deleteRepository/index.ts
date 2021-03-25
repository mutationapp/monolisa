import deleteRepository from './deleteRepository'
import Knex from 'knex'

export type deleteRepositoryType = (
  context: Knex,
) => (id: string) => Promise<void>

export default deleteRepository
