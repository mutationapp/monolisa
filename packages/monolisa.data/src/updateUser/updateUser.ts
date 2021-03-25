import { withQuery } from '../utils'
import { userType } from 'monolisa.model'
import { updateUserType } from '.'
import { DbValidationError } from 'monolisa.lib/error'
import { mergeUndefinedtoNull, onlyDefined } from 'monolisa.lib/utils/object'

const updateUser: updateUserType = context => async member => {
  const { email, name, id } = member || {}

  if (!email || !name || !id) {
    throw new DbValidationError(
      'REQUIRED:',
      mergeUndefinedtoNull({
        id,
        email,
        name,
      }),
    )
  }

  const query = withQuery<userType>(context)('users')

  const user = await query().where({ id })
  if (!user) {
    throw new DbValidationError(
      'NOT FOUND:',
      mergeUndefinedtoNull({
        id,
      }),
    )
  }

  await query()
    .where({ id })
    .update({
      ...onlyDefined({
        email,
        name,
      }),
    })

  return query().where('id', id).first()
}

export default updateUser
