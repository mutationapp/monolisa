import vercelSWR, { keyInterface } from 'swr'
import { ApiError } from 'monolisa.lib/error'
import { fetcherFn, ConfigInterface } from 'swr/dist/types'
import { clientType } from '.'

const useSWR = <T>(
  key: keyInterface,
  fn?: fetcherFn<T>,
  config?: ConfigInterface<T, ApiError>,
  client: clientType[] = ['browser'],
) => {
  return vercelSWR<T, ApiError>(
    key,
    (() => {
      if (process.browser) {
        return client.some(p => p === 'browser') ? fn : undefined
      }

      return client.some(p => p === 'server') ? fn : undefined
    })(),
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      ...config,
    },
  )
}

export default useSWR
