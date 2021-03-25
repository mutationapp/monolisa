import getImport from './getImport'
import { importType } from 'monolisa.model'
import Knex from 'knex'

export type getImportType = (
  contex: Knex,
) => (payload: Partial<importType>) => Promise<importType | undefined>

export default getImport
