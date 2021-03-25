import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import { ApiError } from 'monolisa.lib/error'
import { errorPayloadType } from 'monolisa.lib/api'
import { toJSON } from 'monolisa.lib/utils/string'

const fetcher = async function <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const authToken = Cookies.get('token')

  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...init?.headers,
    },
  })

  const result: T = await (async () => {
    const text = await response.text()
    if (!text) {
      return
    }

    return toJSON(text)
  })()

  if (!response.ok) {
    const payload = (result as errorPayloadType) || {}
    throw new ApiError(response.status, payload.error, payload.data)
  }

  return result
}
export default fetcher
