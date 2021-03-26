import { useRepositoryType } from '.'
import { reportResponseType } from '../../server/shared'
import { useSWR } from '..'

const useJob: useRepositoryType = ({ fetcher }) => ({
  owner,
  repo,
  pullNumber,
  provider,
}) => {
  const pullPath = pullNumber ? `/${pullNumber}` : ''

  const response = useSWR<reportResponseType>(
    `/api/jobs/${provider}/${owner}/${repo}${pullPath}`,
    fetcher,
  )

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useJob
