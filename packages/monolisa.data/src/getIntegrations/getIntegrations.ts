import { getIntegrationsType } from '.'
import { integrationType } from 'monolisa.model'
import { filter } from '../utils'
import { mergeUndefinedtoNull } from 'monolisa.lib/utils/object'

export const getIntegrations: getIntegrationsType = context => async payload => {
  return await filter<integrationType>(context)('integrations')(
    mergeUndefinedtoNull(payload),
  )
}

export default getIntegrations
