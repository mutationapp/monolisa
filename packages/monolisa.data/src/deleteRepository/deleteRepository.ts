import { repositoryType } from 'monolisa.model'
import { deleteRepositoryType } from '.'

const deleteRepository: deleteRepositoryType = context => async id => {
  await context.table<repositoryType>('repositories').where('id', id).delete()
}

export default deleteRepository
