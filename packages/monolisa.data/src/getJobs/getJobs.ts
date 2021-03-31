import { jobType } from 'monolisa.model'
import { getJobsType } from '.'
import { filter } from '../utils'

const getJobs: getJobsType = context => async payload => {
  return await filter<jobType>(context)('jobs')(payload).orderBy(
    'createdTime',
    'desc',
  )
}

export default getJobs
