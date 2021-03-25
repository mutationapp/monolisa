import { useProfileType } from '.'

import { profilePayloadType } from '../../server/shared'
import { useSWR } from '..'

const useProfile: useProfileType = ({ fetcher }) => slug => {
  const response = useSWR<profilePayloadType>(`/api/profile/${slug}`, fetcher)

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useProfile
