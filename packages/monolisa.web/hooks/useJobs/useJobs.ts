import { useJobsType } from '.'
import { useSWR } from '..'
import { jobsPayloadType } from '../../server/shared'

const useJobs: useJobsType = ({ fetcher }) => () => {
  const response = useSWR<jobsPayloadType>(`/api/jobs`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useJobs
