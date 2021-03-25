import { getRepositoriesType } from '.'
import { repositoryType } from 'monolisa.model'
import { filter } from '../utils'

const getRepositories: getRepositoriesType = context => async payload => {
  return await filter<repositoryType>(context)('repositories')(payload).orderBy(
    'createdTime',
    'desc',
  )
}

export default getRepositories
