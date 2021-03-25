import {
  FeatureToggleContextProvider,
  FeatureToggleContext,
} from './featureToggleContext'
import {
  featureTogglesType,
  isFeatureType,
} from '../../server/shared/featureToggles'

export type FeatureToggleContextType = {
  featureToggles: {
    [key: string]: featureTogglesType
  }
  isFeature: isFeatureType
}
export { FeatureToggleContextProvider, FeatureToggleContext }
