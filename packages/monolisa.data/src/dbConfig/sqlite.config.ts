import { getParentPathUntil } from 'monolisa.lib/utils/url/url.utils'
import Knex from 'knex'

const sqliteConfig: (
  DATABASE_URL?: string,
) => Knex.Config | undefined = DATABASE_URL => {
  if (!DATABASE_URL) {
    return
  }

  const { protocol, host } = new URL(DATABASE_URL)

  if (!protocol.startsWith('sqlite')) {
    return
  }

  return {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: (() => {
        return `${getParentPathUntil(__dirname, 'monolisa.data')}/db/${host}`
      })(),
    },
  }
}

export default sqliteConfig
