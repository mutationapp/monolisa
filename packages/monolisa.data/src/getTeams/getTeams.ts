import { getTeamsType } from '.'
import { teamType } from 'monolisa.model'
import { filter } from '../utils'
import { mergeUndefinedtoNull } from 'monolisa.lib/utils/object'
import { validate } from 'uuid'

export const getTeams: getTeamsType = context => async payload => {
  const uuids = [payload.invitationKey, payload.id].filter(Boolean) || []
  if (!uuids.every(id => id && validate(id))) {
    return
  }

  return await filter<teamType>(context)('teams')(mergeUndefinedtoNull(payload))
}

export default getTeams
