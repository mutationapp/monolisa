import fetcher, { useFetchType } from '../fetcher'
import useBlob from './useBlob'
import { blobType, integrationProviderType } from 'monolisa.model'

export type useBlobType = (inject: {
  fetcher: typeof fetcher
}) => (payload: {
  owner: string
  repo: string
  provider: integrationProviderType
  mergeCommitSha: string
  path: string
}) => useFetchType<blobType>

export default useBlob({ fetcher })
