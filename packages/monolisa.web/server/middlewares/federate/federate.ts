import { federateType } from '.'
import { domains } from '../../config'
import { renderUnauthorized } from '../../routes'
import { getDomain } from 'monolisa.lib/utils/url'
import { withStateCookie } from '../../routes/ui/installation.route'
import { decodeProviderStateToken } from 'monolisa.model/src/tokenize'

const federate: federateType = (app, key) => (request, response, next) => {
  const stateCookie = withStateCookie(request, response)

  const state = (decodeProviderStateToken(
    request.query[key] as string | undefined,
  ) || stateCookie.get()) as string | undefined

  if (!state) {
    return next()
  }

  const originUrl = new URL(state)
  const currentHost = request.headers.host

  if (currentHost === originUrl.host) {
    return next()
  }

  const knownDomain = Object.values(domains).some(
    domain => domain === getDomain(originUrl),
  )

  if (!knownDomain) {
    return renderUnauthorized(app, request, response)
  }

  Object.entries(request.query).forEach(([k, v]) => {
    if (k === key) {
      return
    }

    const { searchParams } = originUrl

    searchParams.has(k)
      ? searchParams.set(k, v?.toString() || '')
      : searchParams.append(k, v?.toString() || '')
  })

  stateCookie.set(null)

  return response.redirect(originUrl.href)
}

export default federate
