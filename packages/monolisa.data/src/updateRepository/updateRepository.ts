import { repositoryType } from 'monolisa.model'
import { withQuery } from '../utils'
import { updateRepositoryType } from '.'

const updateRepository: updateRepositoryType = ({
  context,
  getRepository,
}) => async payload => {
  const query = withQuery<repositoryType>(context)('repositories')
  const { id, ...rest } = payload

  const repository = await getRepository({ id })

  if (!repository) {
    return
  }

  const defined = Object.entries(rest).reduce((acc, [key, value]) => {
    if (value === undefined) {
      return acc
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {})

  await query()
    .where('id', id)
    .update({
      ...repository,
      ...defined,
    })

  return await getRepository({ id })
}

export default updateRepository
