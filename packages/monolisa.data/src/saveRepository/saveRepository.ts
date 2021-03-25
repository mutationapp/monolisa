import { repositoryType } from 'monolisa.model'
import { saveRepositoryType } from '.'
import { withQuery } from '../utils'
import { v4 as uuidv4 } from 'uuid'
const saveRepository: saveRepositoryType = context => async ({
  installationId,
  owner,
  repo,
  ...rest
}) => {
  if (!installationId || !owner || !repo) {
    console.error('REQUIRED:', {
      installationId,
      owner,
      repo,
    })
    return
  }

  const query = withQuery<repositoryType>(context)('repositories')

  const id = uuidv4()

  await query().insert({
    id,
    installationId,
    owner,
    repo,
    private: rest.private,
  })

  return await query().where('id', id).first<repositoryType>()
}

export default saveRepository
