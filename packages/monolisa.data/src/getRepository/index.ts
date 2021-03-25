import getRepository from './getRepository'
import { repositoryType } from 'monolisa.model'
import { getRepositories } from '..'

export type getRepositoryType = (inject: {
  getRepositories: typeof getRepositories
}) => (payload: Partial<repositoryType>) => Promise<repositoryType | undefined>

export default getRepository
