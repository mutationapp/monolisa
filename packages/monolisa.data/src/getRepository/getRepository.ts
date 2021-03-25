import { getRepositoryType } from '.'
import { hasDefinedEntry } from '../utils'

const getRepository: getRepositoryType = ({
  getRepositories,
}) => async payload => {
  if (!hasDefinedEntry(payload)) {
    console.error('ONE OF THEM REQUIRED.', {
      ...payload,
    })
    return
  }

  return (await getRepositories(payload))?.[0]
}

export default getRepository
