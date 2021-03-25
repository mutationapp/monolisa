import Knex from 'knex'
import { getRepository } from '..'
import { repositoryType } from 'monolisa.model'
import updateRepository from './updateRepository'

export type updateRepositoryType = (inject: {
  context: Knex
  getRepository: typeof getRepository
}) => (payload: repositoryType) => Promise<repositoryType | undefined>

export default updateRepository
