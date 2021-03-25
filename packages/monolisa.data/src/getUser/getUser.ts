import { getUserType } from '.'
import { userType } from 'monolisa.model'
import { filter } from '../utils'
import { allDefined } from 'monolisa.lib/utils/object'

const getUser: getUserType = context => async payload => {
  if (!allDefined(payload)) {
    console.info('ONE OF THEM REQUIRED.', {
      ...payload,
    })
    return
  }

  const query = filter<userType>(context)('users')(payload)

  return await query.first()
}

export default getUser
