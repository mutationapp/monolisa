import redis, { RedisClient } from 'redis'
import redisStorage from './redisStorage'
import { storageType } from '..'

export type redisStorageType = (client: RedisClient) => storageType

export default (STORAGE_URL?: string) => {
  const redisClient = redis.createClient({ url: STORAGE_URL })

  redisClient.on('error', error => {
    console.warn(error.message)
  })

  return redisStorage(redisClient)
}
