import facepaint from 'facepaint'
import Shevy from 'shevyjs'
import { Options } from 'shevyjs/types'
import { css } from '@emotion/css'

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

export const headerKinds = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
}

export type HeaderKindType = keyof typeof headerKinds

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

const themes = {
  move: {
    media: {
      '1600': 70,
      '1200': 65,
      '900': 56,
      '600': 40,
      '0': 70,
    },
    headerTypography: [
      // [4.8, 3.6, 2.2, 1.8, 1.8, 1.4],
      // [9.6, 4.8, 3.7, 2.4, 2.4, 1.6],
      // [12.8, 6.4, 4, 3.2, 2.4, 1.8],
      // [14.4, 7.2, 4.5, 3.6, 2.4, 1.8],
      [18, 9, 5.6, 4.5, 3, 2.2],
    ] as TypographyType,
    baseFontSize: '10px',
  },
}

export type MediaType = keyof typeof media

const currentTheme = themes.move

const characterPerLine = Object.values(currentTheme.media)
export const queries = Object.keys(currentTheme.media).map(x => parseInt(x))
const breakpoints = queries.filter(Boolean)

export const shevy = (options: Partial<Options>) =>
  new Shevy({
    baseFontSize: currentTheme.baseFontSize,
    ...options,
  })
const { headerTypography } = currentTheme

const f = characterPerLine.reduce(() => {
  if (headerTypography.length > 1) {
    if (characterPerLine.length !== headerTypography.length)
      throw new Error(`Calculated matrix length does not match`)

    return headerTypography
  }

  const [vector] = currentTheme.headerTypography

  const result = characterPerLine.map((y, j, arr) => {
    const max = arr.reduce((a, b) => {
      return Math.max(a, b)
    })

    const currentCharacterPerLine = characterPerLine[j]

    return vector.map(x => x * (currentCharacterPerLine / max))
  })

  return result
}, []) as TypographyType

export const getBit = (kind: HeaderKindType = 'h1') =>
  scale(f)({
    ratio: 2 / 3,
  })?.[kind]

export const getFontSize = (x: number, cpl: number) => {
  return 1.618 * (x / cpl)
}

export const getWidth = fontSize =>
  fontSize.map((size, i) => {
    const num = parseInt(size.replace('px', ''))

    return characterPerLine[i] * (num / 1.618)
  })

export const scale = (typography: TypographyType) => (payload: {
  ratio?: number
  overrides?: { marginBottom?: number; fontFamily?: string }
}) => {
  const { ratio, overrides = { marginBottom: 0 } } = payload
  const pluck = Object.keys(headerKinds)
  const relative = ratio || 1

  const result = typography
    .map(baseFontScale =>
      shevy({
        addMarginBottom: Boolean(overrides?.marginBottom),
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
                marginBottom:
                  marginBottom ||
                  (acc[key]?.marginBottom || []).concat(marginBottom),
                ...overrides,
              },
            }
          },
          {},
        ),
      {},
    )

  return result
}

export const repeat = (fill = 1) => (unit = '1fr') =>
  new Array(fill).fill(unit).join(' ')

export const typographyRatio = { '1': 1, '1/3': 1 / 3, '2/3': 2 / 3 }

export type typographyRatioType = keyof typeof typographyRatio

const typography = (payload: {
  of?: HeaderKindType
  ratio?: typographyRatioType
  overrides?: { marginBottom?: number | 'bit'; fontFamily?: string }
}) => {
  const { ratio = '1', overrides, of = 'h1' } = payload

  return css(
    mq(
      scale(f)({
        ratio: typographyRatio[ratio],
        overrides: {
          ...overrides,
          marginBottom:
            typeof overrides?.marginBottom === 'string'
              ? getBit(of).fontSize
              : overrides?.marginBottom,
        },
      })[of],
    ),
  )
}

export const mq = facepaint(
  // getWidth(getBit('h3').fontSize)
  //   .splice(1)
  breakpoints.map(bp => `@media (min-width: ${bp}px)`),
)

export default typography
