import { useTeamInvitationKeyType } from '.'
import { useEffect, useState } from 'react'
import { teamInvitationPayloadType } from '../../server/shared'
import fetcher from '../fetcher'
import { ApiError } from 'monolisa.lib/error'

const useTeamInvitationKey: useTeamInvitationKeyType = teamSlug => {
  const [data, setData] = useState<teamInvitationPayloadType | undefined>()
  const [error, setError] = useState<ApiError | undefined>()
  const [reset, setReset] = useState<boolean | undefined>()

  useEffect(() => {
    ;(async () => {
      if (reset === false) {
        return
      }

      try {
        const response = await fetcher<teamInvitationPayloadType>(
          `/api/teams/${teamSlug}/invitations`,
          {
            method: 'PATCH',
            body: JSON.stringify({ reset }),
          },
        )
        setData(response)
      } catch (error) {
        setError(error)
      } finally {
        setReset(false)
      }
    })()
  }, [reset])

  return {
    data,
    error,
    reset: () => {
      setReset(true)
    },
  }
}

export default useTeamInvitationKey
