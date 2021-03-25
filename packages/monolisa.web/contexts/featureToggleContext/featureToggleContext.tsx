import { createContext, useState } from 'react'
import { FeatureToggleContextType } from '.'
import {
  featureTogglesType,
  isFeature,
} from '../../server/shared/featureToggles'

export const FeatureToggleContext = createContext<FeatureToggleContextType>({
  isFeature: () => false,
  featureToggles: {} as {
    [key: string]: featureTogglesType
  },
})

export const FeatureToggleContextProvider: React.FunctionComponent<{
  featureToggles: {
    [key: string]: featureTogglesType
  }
}> = ({ children, ...rest }) => {
  const [featureToggles] = useState<{
    [key: string]: featureTogglesType
  }>(rest.featureToggles)

  const value: FeatureToggleContextType = {
    featureToggles,
    isFeature: isFeature(featureToggles),
  }

  return (
    <FeatureToggleContext.Provider value={value}>
      {children}
    </FeatureToggleContext.Provider>
  )
}
