import fetcher, { useFetchType } from '../fetcher'
import useJob from './useRepository'
import { jobResponseType } from '../../server/shared'
import { integrationProviderType } from 'monolisa.model'

export type useJobType = (inject: {
  fetcher: typeof fetcher
}) => (payload: {
  provider: integrationProviderType
  repo: string
  owner: string
}) => useFetchType<jobResponseType>

export default useJob({ fetcher })
