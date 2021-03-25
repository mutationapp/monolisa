// https://scotch.io/tutorials/how-to-optimize-node-requests-with-simple-caching-strategies

import { cacheType } from '.'
import storage from 'monolisa.storage'
import { ok } from 'monolisa.lib/api'
import { getEnv } from 'monolisa.lib/env'

const prefix = '__web__:'
const year = 60 * 60 * 24 * 365

const { MONOLISA_ENV } = getEnv()
const cache: cacheType = handler => async (request, response, next) => {
  // Remove me
  if (MONOLISA_ENV === 'development') return next()

  if (!(await storage.isConnected())) {
    return next()
  }

  const handle = handler?.(request)

  if (handle === false) {
    return next()
  }

  const key = (() => {
    if (handle == null || handle === true || !handle.key) {
      return `${prefix}${request.originalUrl}`
    }

    const { key } = handle

    return `${key.startsWith(prefix) ? '' : prefix}${key}`
  })()

  const expires = typeof handle === 'object' ? handle.expires ?? year : year

  if (expires === 0) {
    return next()
  }

  try {
    const stored = await storage.get(key)

    if (stored) {
      return ok(response, JSON.parse(stored))
    }
  } catch (error) {
    console.warn(`CACHE ERROR:`, error)
    return next()
  }

  const sendJson = response.json.bind(response)

  response.json = body => {
    response.statusCode === 200 &&
      storage.save(key, JSON.stringify(body), expires)

    return sendJson(body)
  }

  next()
}

export default cache
