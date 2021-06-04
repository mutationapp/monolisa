import { repositoryType } from 'monolisa.model'
import { useJobsType } from '.'
import { useSWR } from '..'

const useJobs: useJobsType = ({ fetcher }) => () => {
  const response = useSWR<{
    repositories: repositoryType[]
  }>(`/api/jobs`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useJobs
