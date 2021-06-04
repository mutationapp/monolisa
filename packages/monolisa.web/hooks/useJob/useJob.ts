import { useJobType } from '.'
import { jobResponseType } from '../../server/shared'
import { useSWR } from '..'

const useJob: useJobType = ({ fetcher }) => ({ owner, repo, provider }) => {
  const response = useSWR<jobResponseType>(
    `/api/jobs/${provider}/${owner}/${repo}`,
    fetcher,
  )

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useJob
