import cache from './cache'
import { Request, RequestHandler } from 'express'

export type cacheHandler = (
  request: Request,
) => { key?: string; expires?: number } | boolean

export type cacheType = (handler?: cacheHandler) => RequestHandler

export default cache
