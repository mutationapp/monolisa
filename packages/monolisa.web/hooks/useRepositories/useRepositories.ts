import { repositoryType } from 'monolisa.model'
import { useRepositoriesType } from '.'
import { useSWR } from '..'

const useRepositories: useRepositoriesType = ({ fetcher }) => () => {
  const response = useSWR<{
    repositories: repositoryType[]
  }>(`/api/jobs`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useRepositories
