import { getTeamType } from '.'
import { hasDefinedEntry } from '../utils'

const getTeam: getTeamType = ({ getTeams }) => async payload => {
  if (!hasDefinedEntry(payload)) {
    console.error('ONE OF THEM REQUIRED.', {
      ...payload,
    })
    return
  }

  return (await getTeams(payload))?.[0]
}

export default getTeam
