import { featureTogglesType } from '.'

const featureToggles: {
  [key: string]: featureTogglesType
} = {
  all: {
    FT_TEAM_SLUG_CREATION: 'off',
  },
  // development: {
  //   FT_TEAM_SLUG_CREATION: 'on',
  // },
  // review: {
  //   FT_TEAM_SLUG_CREATION: 'on',
  // },
  // production: {
  //   FT_TEAM_SLUG_CREATION: 'on',
  // },
}

export default featureToggles
