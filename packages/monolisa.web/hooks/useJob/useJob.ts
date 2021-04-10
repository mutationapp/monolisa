import { useJobType } from '.'
import { jobResponseType } from '../../server/shared'
import { useSWR } from '..'

const useJob: useJobType = ({ fetcher }) => ({ id }) => {
  const response = useSWR<jobResponseType>(`/api/jobs/${id}`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useJob
