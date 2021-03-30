import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { getParentPath } from 'monolisa.lib/utils/url'
import sqliteConfig from './sqlite.config'
import postgresConfig from './postgres.config'
import Knex from 'knex'

export const isLocalhost = (host?: string | null) =>
  host && ['localhost', '127.0.0.1'].some(x => x === host)

const { INIT_CWD } = process.env

const configPath = [INIT_CWD, getParentPath(getParentPath(INIT_CWD))]
  .map(dir => dir && path.join(dir, '.env'))
  .find(path => path && fs.existsSync(path))

dotenv.config({ path: configPath })

const { DATABASE_URL } = process.env

const config = sqliteConfig(DATABASE_URL) || postgresConfig(DATABASE_URL)

const result: Knex.Config = config
  ? {
      migrations: {
        tableName: 'knex_migrations',
      },
      ...config,
    }
  : {}

export default result as Knex.Config
