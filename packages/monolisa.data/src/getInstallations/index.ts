import getInstallations from './getInstallations'
import { installationType } from 'monolisa.model'
import Knex from 'knex'

export type getInstallationsType = (
  context: Knex,
) => (
  payload: Partial<installationType> | string,
) => Promise<installationType[] | undefined>
export default getInstallations
