import fetcher, { useFetchType } from '../fetcher'

import { repositoryType } from 'monolisa.model'
import useRepositories from './useRepositories'

export type useRepositoriesType = (inject: {
  fetcher: typeof fetcher
}) => () => useFetchType<{
  repositories: repositoryType[]
}>
export default useRepositories
