import { importType, importBaseType } from 'monolisa.model'
import saveImport from './saveImport'
import Knex from 'knex'

export type saveImportType = (
  context: Knex,
) => (
  payload: importBaseType,
  reservedToken?: string,
) => Promise<importType | undefined>

export default saveImport
