import { getParentPath } from 'monolisa.lib/utils/url'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import redisStorage from './redisStorage'

const { INIT_CWD } = process.env

const configPath = [INIT_CWD, getParentPath(getParentPath(INIT_CWD))]
  .map(dir => dir && path.join(dir, '.env'))
  .find(path => path && fs.existsSync(path))

dotenv.config({ path: configPath })

const { STORAGE_URL } = process.env

export type storageType = {
  get: (key: string) => Promise<string | undefined>
  save: (
    key: string,
    value: string,
    seconds?: number,
  ) => Promise<string | undefined>
  remove: (key: string) => Promise<boolean>
  flush: () => Promise<void>
  isConnected: () => Promise<boolean>
}

export default redisStorage(STORAGE_URL)
