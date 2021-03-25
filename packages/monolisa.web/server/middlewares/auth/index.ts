import auth from './auth'
import { RequestHandler } from 'express'
import { memberType } from 'monolisa.model'

export type authType = (
  authorize?: boolean,
  redirect?: (member?: memberType) => string | undefined,
) => RequestHandler

export default auth
