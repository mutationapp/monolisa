import { installationPayloadType } from '../../server/shared'
import fetcher from '../fetcher'
import { useInstallationType } from '.'
import { useSWR, useAppContext } from '..'

const useInstallation: useInstallationType = props => {
  const { team } = useAppContext()

  const teamMember = team?.teamMember
  const { installationId, scope } = props

  const query = scope?.length ? `?scope=${scope.join(',')}` : ''
  const response = useSWR<installationPayloadType>(
    teamMember
      ? `/api/teams/${teamMember.teamSlug}/installations/${installationId}${query}`
      : `/api/installations/${installationId}${query}`,
    fetcher,
  )

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useInstallation
