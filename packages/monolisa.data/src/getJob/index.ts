import getJob from './getJob'
import { jobType } from 'monolisa.model'
import { getJobs } from '..'

export type getJobType = (inject: {
  getJobs: typeof getJobs
}) => (payload: Partial<jobType>) => Promise<jobType | undefined>

export default getJob
