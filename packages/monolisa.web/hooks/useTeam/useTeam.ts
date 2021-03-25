import { useTeamType } from '.'

import { teamPayloadType } from '../../server/shared'
import { useSWR } from '..'

const useTeam: useTeamType = ({ fetcher }) => (teamSlug: string) => {
  const response = useSWR<teamPayloadType>(`/api/teams/${teamSlug}`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useTeam
