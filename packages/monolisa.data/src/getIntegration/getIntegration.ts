import { getIntegrationType } from '.'
import { hasDefinedEntry } from '../utils'

const getIntegration: getIntegrationType = ({
  getIntegrations,
}) => async payload => {
  if (!hasDefinedEntry(payload)) {
    console.error('ONE OF THEM REQUIRED.', {
      ...payload,
    })
    return
  }

  return (await getIntegrations(payload))?.[0]
}

export default getIntegration
