import { getUsersType } from '.'
import { userType } from 'monolisa.model'
import { filter } from '../utils'

const getUsers: getUsersType = context => async payload => {
  return filter<userType>(context)('users')(payload)
}

export default getUsers
