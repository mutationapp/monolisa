import fetcher, { useFetchType } from '../fetcher'
import useJob from './useJob'
import { jobResponseType } from '../../server/shared'

export type useJobType = (inject: {
  fetcher: typeof fetcher
}) => (payload: { id: string }) => useFetchType<jobResponseType>

export default useJob({ fetcher })
