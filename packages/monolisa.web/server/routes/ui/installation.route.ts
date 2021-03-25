import { routeBaseType, renderNotFound, render } from '../index'
import { integrationProviderType } from 'monolisa.model'
import { parseCookie } from 'monolisa.lib/utils/cookie'
import { toJSON } from 'monolisa.lib/utils/string'
// import { signProviderStateToken } from 'monolisa.model/src/tokenize'

type installationCookieType = {
  teamSlug?: string
}

export const withInstallationCookie = (request, response) => ({
  set: ({ teamSlug }: installationCookieType) => {
    response.cookie('installation', JSON.stringify({ teamSlug }))
  },
  get: () => {
    const { installation } = parseCookie(request.headers.cookie) || {}

    return (toJSON(installation) || {}) as installationCookieType
  },
})

export const withStateCookie = (request, response) => ({
  set: (value: string | null) => {
    response.cookie('state', value || '')
  },
  get: () => {
    return parseCookie(request.headers.cookie)?.state
  },
})

const installationRoute: routeBaseType = ({ server, app, auth }) => {
  server.get(
    '/installations/:provider(github)/:teamSlug?',
    auth(),
    async (request, response) => {
      const provider = request.params.provider as integrationProviderType

      if (provider !== 'github') {
        return renderNotFound(app, request, response)
      }

      const teamSlug = request.params.teamSlug as string | undefined
      withInstallationCookie(request, response).set({
        teamSlug,
      })

      // const base = `${request.protocol || 'http'}://${request.headers.host}`

      // const { GITHUB_APP_NAME, GITHUB_APP_RETURN_HOST } = process.env
      const { GITHUB_APP_NAME } = process.env

      const state = request.query.state as string | undefined

      withStateCookie(request, response).set(state || null)
      // if (GITHUB_APP_RETURN_HOST && base !== GITHUB_APP_RETURN_HOST) {
      //   return response.redirect(
      //     `${GITHUB_APP_RETURN_HOST}/installations/${provider}${
      //       teamSlug ? `/${teamSlug}` : ''
      //     }?state=${signProviderStateToken(`${base}/authorize`)}`,
      //   )
      // }

      return response.redirect(
        `https://github.com/apps/${GITHUB_APP_NAME}/installations/new`,
      )
    },
  )

  server.get('/:slug/installations', auth(), async (request, response) => {
    return render(app, request, response)('/installations')
  })
}

export default installationRoute
