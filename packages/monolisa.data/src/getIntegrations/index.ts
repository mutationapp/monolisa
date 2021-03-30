import getIntegrations from './getIntegrations'
import { integrationType } from 'monolisa.model'
import Knex from 'knex'

export type getIntegrationsType = (
  context: Knex,
) => (
  payload: Partial<integrationType>,
) => Promise<integrationType[] | undefined>
export default getIntegrations
