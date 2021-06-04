import fetcher, { useFetchType } from '../fetcher'

import { repositoryType } from 'monolisa.model'
import useJobs from './useJobs'

export type useJobsType = (inject: {
  fetcher: typeof fetcher
}) => () => useFetchType<{
  repositories: repositoryType[]
}>

export default useJobs
