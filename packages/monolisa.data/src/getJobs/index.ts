import getJobs from './getJobs'
import { jobType } from 'monolisa.model'
import Knex from 'knex'
import { filterPayloadType } from '../utils'

export type getJobsType = (
  inject: Knex,
) => (payload: filterPayloadType<jobType>) => Promise<jobType[] | undefined>

export default getJobs
