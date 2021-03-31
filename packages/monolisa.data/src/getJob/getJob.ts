import { getJobType } from '.'
import { hasDefinedEntry } from '../utils'

const getJob: getJobType = ({ getJobs }) => async payload => {
  if (!hasDefinedEntry(payload)) {
    console.error('ONE OF THEM REQUIRED.', {
      ...payload,
    })
    return
  }

  return (await getJobs(payload))?.[0]
}

export default getJob
