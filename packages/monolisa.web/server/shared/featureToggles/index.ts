import featureToggles from './feature.toggles'

const MONOLISA_ENV = process.env.MONOLISA_ENV as string

export type featureTogglesResponseType = 'on' | 'off'

export type featureTogglesType = {
  FT_TEAM_SLUG_CREATION: featureTogglesResponseType
}

export type togglesType = featureTogglesType | featureTogglesType[]

export type isFeatureType = (toggles: togglesType) => boolean

export const isFeature: (toggles: {
  [key: string]: featureTogglesType
}) => isFeatureType = features => (
  payload: featureTogglesType | featureTogglesType[],
) => {
  const toggles = payload instanceof Array ? payload : [payload]

  const env = features[MONOLISA_ENV] ? MONOLISA_ENV : 'all'

  return toggles.some(toggle =>
    Object.entries(toggle).every(
      ([key, value]) => features[env]?.[key] === value,
    ),
  )
}

export default featureToggles
