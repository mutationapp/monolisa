import resetImport from './resetImport'
import Knex from 'knex'
import { importType } from 'monolisa.model'

export type resetImportType = (
  context: Knex,
) => (key: string) => Promise<importType | undefined>

export default resetImport
