import { getIntegration } from '..'
import { integrationType } from 'monolisa.model'

import updateIntegration from './updateIntegration'
import Knex from 'knex'

export type updateIntegrationType = (
  context: Knex,
) => (inject: {
  getIntegration: typeof getIntegration
}) => (integration: integrationType) => Promise<integrationType | undefined>

export default updateIntegration
