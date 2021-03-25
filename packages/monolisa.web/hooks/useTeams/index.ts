import fetcher, { useFetchType } from '../fetcher'

import useTeams from './useTeams'
import { teamsPayloadType } from '../../server/shared'

export type useTeamsType = (inject: {
  fetcher: typeof fetcher
}) => () => useFetchType<teamsPayloadType>

export default useTeams({ fetcher })
