import 'newrelic'

import express, { Application } from 'express'
import compression from 'compression'

import { apiRoutes, uiRoutes, render } from './routes'

import bodyParser from 'body-parser'
import next from 'next'

import { parseCookie } from 'monolisa.lib/utils/cookie'
import { auth } from './middlewares'
import { port } from './config'
import featureToggles from './shared/featureToggles'
import whenFeature from './middlewares/whenFeature'
import helmet from 'helmet'

import { memberType } from 'monolisa.model'
import { dealWithIt } from 'monolisa.lib'
import { NextServer } from 'next/dist/server/next'

// c(▀̿Ĺ̯▀̿ ̿).
;(async (server: Application, app: NextServer) => {
  const handle = app.getRequestHandler()
  await app.prepare()

  // server.use(helmet.contentSecurityPolicy())
  server.use(helmet.dnsPrefetchControl())
  server.use(helmet.expectCt())
  server.use(helmet.frameguard())
  server.use(helmet.hidePoweredBy())
  server.use(helmet.hsts())
  server.use(helmet.ieNoOpen())
  server.use(helmet.noSniff())
  server.use(helmet.permittedCrossDomainPolicies())
  server.use(helmet.referrerPolicy())
  server.use(helmet.xssFilter())

  server.use([
    // pinoHttp(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
    compression(),
  ])

  const apiAuth = auth()
  const uiAuth = auth({ app })

  const both = {
    server,
    whenFeature: whenFeature(featureToggles),
  }

  {
    const { installation, profile, repository, user, team } = apiRoutes

    ;[installation, team, repository, profile, user].forEach(route => {
      route({ auth: apiAuth, ...both })
    })
  }

  {
    const { login, repository, team, installation } = uiRoutes

    ;[installation, team, repository, login].forEach(route => {
      route({ ...both, app, auth: uiAuth })
    })
  }

  ;[
    { routes: ['/', '/rules', '/tyler', '/setup', '/:slug/jobs'] },
    {
      routes: ['/:slug/account', '/:slug/import'],
      authorize: true,
    },
    {
      routes: ['/login'],
      authorize: false,
      redirect: (member?: memberType) =>
        member ? `/${member.slug}` : undefined,
    },
    { routes: ['/:slug'] },
  ].forEach(({ routes, authorize, redirect }) => {
    const map = {
      '/:slug': `/jobs`,
      '/:slug/account': `/account`,
      '/:slug/jobs': `/jobs`,
      '/:slug/import': `/jobs/import`,
    }

    routes.forEach(route => {
      server.get(
        route,
        uiAuth(authorize, redirect),
        async (request, response) => {
          return render(app, request, response)(map[route] || route)
        },
      )
    })
  })

  server.get('*', async (request, response) => {
    const { theme, routeTabIcons } = parseCookie(request.headers.cookie) || {}

    !theme && response.cookie('theme', 'dark')
    !routeTabIcons && response.cookie('routeTabIcons', 'show')
    return handle(request, response)
  })
  server.listen(port, () => {
    console.info(dealWithIt(`🚀> Ready on http://localhost:${port}`))
  })
})(
  express(),
  next({
    dev: process.env.NODE_ENV !== 'production',
    customServer: true,
    dir: '.',
  }),
)
