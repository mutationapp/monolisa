import { useTeamsType } from '.'
import { teamsPayloadType } from '../../server/shared'
import { useSWR } from '..'

const useTeams: useTeamsType = ({ fetcher }) => () => {
  const response = useSWR<teamsPayloadType>(`/api/teams`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useTeams
