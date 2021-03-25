import fetcher, { useFetchType } from '../fetcher'

import useProfile from './useProfile'
import { profilePayloadType } from '../../server/shared'

export type useProfileType = (inject: {
  fetcher: typeof fetcher
}) => (slug: string) => useFetchType<profilePayloadType>

export default useProfile({ fetcher })
