import getTeam from './getTeam'
import { teamType } from 'monolisa.model'
import { getTeams } from '..'

export type getTeamType = (inject: {
  getTeams: typeof getTeams
}) => (payload: Partial<teamType>) => Promise<teamType | undefined>

export default getTeam
