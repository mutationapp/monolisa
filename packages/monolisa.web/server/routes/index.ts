import { Application } from 'express'
import * as uiRoutes from './ui'
import * as apiRoutes from './api'

import { IncomingMessage, ServerResponse } from 'http'
import { ParsedUrlQuery } from 'querystring'
import { whenFeatureType } from '../middlewares/whenFeature'
import { authType } from '../middlewares/auth'
import { buildQuery } from 'monolisa.lib/utils/url'
import { NextServer } from 'next/dist/server/next'

export const render = <T extends ParsedUrlQuery>(
  app: NextServer,
  req: IncomingMessage,
  res: ServerResponse,
) => (pathname: string, query?: T) => {
  return app.render(req, res, pathname, query)
}

export const renderError = <T extends ParsedUrlQuery>(
  app: NextServer,
  req: IncomingMessage,
  res: ServerResponse,
) => (error?: Error, query?: T) => {
  if (res.statusCode === 200) res.statusCode = 500
  return app.renderError(error || null, req, res, '/_error', query)
}

export const renderUnauthorized = (
  app: NextServer,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res.statusCode = 401
  return renderError(app, req, res)()
}

export const redirectUnauthorized = (
  req: IncomingMessage,
  res: ServerResponse & { redirect: (url: string) => void },
  to?: string,
) => {
  res.statusCode = 401

  return res.redirect(
    to ||
      `/login?${buildQuery({
        returnUrl: req.url,
      })}`,
  )
}

export const renderNotAllowed = (
  app: NextServer,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res.statusCode = 403
  return renderError(app, req, res)()
}

export const renderNotFound = (
  app: NextServer,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res.statusCode = 404
  return renderError(app, req, res)()
}

export type apiRouteType = (inject: {
  server: Application
  auth: authType
  whenFeature: whenFeatureType
}) => void

export type routeBaseType = (inject: {
  server: Application
  app: NextServer
  auth: authType
  whenFeature: whenFeatureType
}) => void

export { uiRoutes, apiRoutes }
