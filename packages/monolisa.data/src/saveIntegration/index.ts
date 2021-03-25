import { getIntegration } from '..'
import { integrationBaseType, integrationType } from 'monolisa.model'

import saveIntegration from './saveIntegration'
import Knex from 'knex'

export type saveIntegrationType = (
  context: Knex,
) => (inject: {
  getIntegration: typeof getIntegration
}) => (integration: integrationBaseType) => Promise<integrationType | undefined>

export default saveIntegration
