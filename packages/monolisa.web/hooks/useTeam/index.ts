import fetcher, { useFetchType } from '../fetcher'

import useTeam from './useTeam'
import { teamPayloadType } from '../../server/shared'

export type useTeamType = (inject: {
  fetcher: typeof fetcher
}) => (teamSlug: string) => useFetchType<teamPayloadType>

export default useTeam({ fetcher })
