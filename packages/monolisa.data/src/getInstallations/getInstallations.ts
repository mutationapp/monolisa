import { getInstallationsType } from '.'
import { installationType } from 'monolisa.model'
import { filter } from '../utils'
import { mergeUndefinedtoNull } from 'monolisa.lib/utils/object'
import { getUserTeams } from '..'

export const getInstallations: getInstallationsType = context => async payload => {
  if (typeof payload === 'string') {
    const teams = (await getUserTeams(payload))?.map(team => team.teamId) || []

    return filter<installationType>(context)('installations')({
      userId: payload,
    })?.orWhereIn('teamId', teams)
  }

  return await filter<installationType>(context)('installations')(
    mergeUndefinedtoNull(payload),
  )
}

export default getInstallations
