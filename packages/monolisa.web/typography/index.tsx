import facepaint from 'facepaint'
import Shevy from 'shevyjs'
import { Options } from 'shevyjs/types'
import { css } from '@emotion/css'

import {
  headerKinds,
  HeaderKindType,
  headerTypography,
} from '../components/header'

export const media = {
  'min-width: 0px': 'min-width: 0px',
  'min-width: 600px': 'min-width: 600px',
  'min-width: 900px': 'min-width: 900px',
  'min-width: 1200px': 'min-width: 1200px',
  'min-width: 1600px': 'min-width: 1600px',
}

export type FontScaleType = [
  // h1
  number,
  // h2
  number,
  // h3
  number,
  // h4
  number,
  // h5
  number,
  // h6
  number,
]

// min-width
export type TypographyType =
  | [FontScaleType]
  | [
      // 0px
      FontScaleType,
      // 600px
      FontScaleType,
      // 900px
      FontScaleType,
      // 1200px
      FontScaleType,
      // 1600px
      FontScaleType,
    ]

export type MediaType = keyof typeof media

export const mq = facepaint(
  [0, 600, 900, 1200].map(bp => `@media (min-width: ${bp}px)`),
)

export const shevy = (options: Partial<Options>) =>
  new Shevy({
    baseFontSize: '10px',
    ...options,
  })

export const scale = (typography: TypographyType) => (payload: {
  ratio?: number
  addMarginBottom?: boolean
}) => {
  const { ratio, addMarginBottom } = payload
  const pluck = Object.keys(headerKinds)
  const relative = ratio || 1

  const result = typography
    .map(baseFontScale =>
      shevy({
        addMarginBottom,
        baseFontScale: baseFontScale.map(item => item * relative),
      }),
    )
    .reduce(
      (acc, shevy) =>
        (pluck instanceof Array ? pluck : Object.keys(pluck)).reduce(
          (join, key) => {
            const fontSize = `${parseInt(
              shevy[key].fontSize.replace('px', ''),
            )}px`

            const lineHeight = shevy[key].lineHeight
            const marginBottom = shevy[key].marginBottom

            return {
              ...join,
              [key]: {
                fontSize: (acc[key]?.fontSize || []).concat(fontSize),
                lineHeight: (acc[key]?.lineHeight || []).concat(lineHeight),
                marginBottom: (acc[key]?.marginBottom || []).concat(
                  marginBottom,
                ),
              },
            }
          },
          {},
        ),
      {},
    )

  return result
}

export const typographyRatio = { '1': 1, '1/3': 1 / 3, '2/3': 2 / 3 }

export type typographyRatioType = keyof typeof typographyRatio

const typography = (payload: {
  of?: HeaderKindType
  ratio?: typographyRatioType
  addMarginBottom?: boolean
}) => {
  const { ratio = '1', addMarginBottom, of = 'h1' } = payload

  return css(
    mq(
      scale(headerTypography)({
        ratio: typographyRatio[ratio],
        addMarginBottom,
      })[of],
    ),
  )
}

export default typography
