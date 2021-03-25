import fetcher, { useFetchType } from '../fetcher'
import useRepository from './useRepository'
import { reportResponseType } from '../../server/shared'
import { integrationProviderType } from 'monolisa.model'

export type useRepositoryType = (inject: {
  fetcher: typeof fetcher
}) => (payload: {
  provider: integrationProviderType
  repo: string
  owner: string
  pullNumber?: string
}) => useFetchType<reportResponseType>

export default useRepository({ fetcher })
