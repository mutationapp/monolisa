import DealWithIt from './dealWithIt'
import Button from './button'
import Spinner from './spinner'
import Header from './header'
import Frame from './frame'
import Text from './text'
import facepaint from 'facepaint'
import Shevy from 'shevyjs'

export const mq = facepaint(
  [0, 600, 900, 1200].map(bp => `@media (min-width: ${bp}px)`),
)

export const media = {
  'min-width: 0px': 'min-width: 0px',
  'min-width: 600px': 'min-width: 600px',
  'min-width: 900px': 'min-width: 900px',
  'min-width: 1200px': 'min-width: 1200px',
  'min-width: 1600px': 'min-width: 1600px',
}

export const shevy = options =>
  new Shevy({
    baseFontSize: '10px',
    ...options,
  })

type FontScaleType = [
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
export type TypographyType = [
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

export const scale = (typography: TypographyType) => (
  pluck: object,
  ratio: 1 | 0.5 | 1.5 = 1,
) =>
  typography
    .map(baseFontScale =>
      shevy({
        baseFontScale: baseFontScale.map(item => item * ratio),
      }),
    )
    .reduce(
      (acc, shevy) =>
        Object.keys(pluck).reduce((join, key) => {
          const fontSize = `${parseInt(
            shevy[key].fontSize.replace('px', ''),
          )}px`

          const lineHeight = shevy[key].lineHeight
          const marginBottom = shevy[key].marginBottom

          return {
            ...join,
            [key]: {
              fontSize,
              lineHeight,
              marginBottom,
            },
          }
        }, {}),
      {},
    )
export const render = (f: { (): React.ReactNode | undefined }) => f()

export type MediaType = keyof typeof media

export { Text, Frame, Header, Button, DealWithIt, Spinner }
