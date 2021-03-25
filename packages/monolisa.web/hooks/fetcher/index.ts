import fetcher from './fetcher'
import { ApiError } from 'monolisa.lib/error'

export type useFetchType<T> = {
  data?: T
  error?: ApiError
}

export const isLoading = <T>(response: useFetchType<T>) => {
  return !response.data && !response.error
}
export default fetcher
