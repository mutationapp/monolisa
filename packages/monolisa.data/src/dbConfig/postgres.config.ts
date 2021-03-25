import { parse as parsePgUrl } from 'pg-connection-string'
import { isLocalhost } from './index'
import Knex from 'knex'

const defaultPort = 5432

const postgresConfig: (DATABASE_URL?: string) => Knex.Config | undefined = (
  DATABASE_URL?: string,
) => {
  if (!DATABASE_URL) {
    return
  }

  const { host, port, ...config } = parsePgUrl(DATABASE_URL)
  if (!host) {
    return
  }

  const { protocol } = new URL(DATABASE_URL)

  if (!protocol.startsWith('postgres')) {
    return
  }

  return {
    client: 'pg',
    connection: (() => {
      return {
        ...config,
        host,
        port: parseInt(port || defaultPort.toString()),

        //https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
        ssl: isLocalhost(host)
          ? false
          : {
              rejectUnauthorized: false,
            },
      }
    })(),
    pool: { min: 0, max: 7 },
  }
}
export default postgresConfig
