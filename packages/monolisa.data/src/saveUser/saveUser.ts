import { saveUserType } from '.'
import { withQuery } from '../utils'
import { memberType } from 'monolisa.model'
import { v4 as uuidv4 } from 'uuid'

const saveUser: saveUserType = context => async user => {
  const { email, name, slug } = user || {}

  if (!email || !name || !slug) {
    console.error('REQUIRED: ', {
      email,
      name,
      slug,
    })

    return
  }

  const id = uuidv4()
  const key = uuidv4()

  const query = withQuery<memberType>(context)('users')

  await query().insert({
    id,
    key,
    email,
    name,
    slug,
  })

  return query().where('id', id).first()
}

export default saveUser
