import { useFetchType } from '../fetcher'
import useTeamInvitationKey from './useTeamInvitationKey'

export type useTeamInvitationKeyType = (
  teamSlug: string,
) => useFetchType<{ invitationKey: string }> & { reset: () => void }

export default useTeamInvitationKey
