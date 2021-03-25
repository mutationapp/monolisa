import { createHandyClient } from 'handy-redis'
import { redisStorageType } from '.'

const redisStorage: redisStorageType = client => {
  const handy = createHandyClient(client)

  return {
    get: async key => {
      return (await handy.get(key)) || undefined
    },
    save: async (key, value, seconds) => {
      const until = seconds ?? 60 * 60 * 24 * 365

      if (until === 0) {
        return
      }

      return (await handy.set(key, value, ['EX', until])) ?? undefined
    },
    remove: async key => {
      return (await handy.del(key)) > 0
    },
    flush: async () => {
      await handy.flushall()
    },
    isConnected: async () => {
      try {
        return Boolean(await handy.ping())
      } catch (error) {
        return false
      }
    },
  }
}

export default redisStorage
