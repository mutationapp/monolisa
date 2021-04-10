import useJobs from './useJobs'

import fetcher, { useFetchType } from '../fetcher'
import { jobsPayloadType } from '../../server/shared'

export type useJobsType = (inject: {
  fetcher: typeof fetcher
}) => () => useFetchType<jobsPayloadType>

export default useJobs({ fetcher })
