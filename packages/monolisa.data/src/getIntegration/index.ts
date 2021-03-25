import getIntegration from './getIntegration'
import { integrationType } from 'monolisa.model'
import { getIntegrations } from '..'

export type getIntegrationType = (inject: {
  getIntegrations: typeof getIntegrations
}) => (
  payload: Partial<integrationType>,
) => Promise<integrationType | undefined>

export default getIntegration
