import { repositoryType } from 'monolisa.model'
import saveRepository from './saveRepository'
import Knex from 'knex'

export type saveRepositoryType = (
  context: Knex,
) => (payload: {
  repo: string
  owner: string
  installationId: string
  private: boolean
}) => Promise<repositoryType | undefined>

export default saveRepository
