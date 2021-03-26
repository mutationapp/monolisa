import vercelSWR, { Key } from 'swr'
import { ApiError } from 'monolisa.lib/error'
import { Fetcher, SWRConfiguration } from 'swr/dist/types'
import { clientType } from '.'

const useSWR = <T>(
  key: Key,
  fn?: Fetcher<T>,
  config?: SWRConfiguration<T, ApiError>,
  client: clientType[] = ['browser'],
) => {
  return vercelSWR<T, ApiError>(
    key,
    (() => {
      if (process.browser) {
        return client.some(p => p === 'browser') ? fn : undefined
      }

      return client.some(p => p === 'server') ? fn : undefined
    })() || null,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      ...config,
    },
  )
}

export default useSWR
