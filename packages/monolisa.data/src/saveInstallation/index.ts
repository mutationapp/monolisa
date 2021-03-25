import { installationBaseType, installationType } from 'monolisa.model'
import saveInstallation from './saveInstallation'
import Knex from 'knex'

export type saveInstallationType = (
  context: Knex,
) => (payload: installationBaseType) => Promise<installationType | undefined>

export default saveInstallation
