import { whenFeatureType } from '.'
import { notAllowed } from 'monolisa.lib/api'
import { isFeature, featureTogglesType } from '../../shared/featureToggles'

const whenFeature = (fatures: {
  [key: string]: featureTogglesType
}): whenFeatureType => toggles => async (_, response, next) => {
  if (!isFeature(fatures)(toggles)) {
    return notAllowed(response)
  }

  next()
}

export default whenFeature
