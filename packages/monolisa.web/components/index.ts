import DealWithIt from './dealWithIt'
import Button from './button'
import Spinner from './spinner'
import Header from './header'
import Frame from './frame'
import Text from './text'
import facepaint from 'facepaint'
import Shevy from 'shevyjs'
import defaultsDeep from 'lodash.defaultsdeep'

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

export type TypographyType = [
  // min-width: 0px
  number[],
  // min-width: 600px
  number[],
  // min-width: 900px
  number[],
  // min-width: 1200px
  number[],
  // min-width: 1600px
  number[],
]

export const scale = (
  typography: [
    // min-width: 0px
    number[],
    // min-width: 600px
    number[],
    // min-width: 900px
    number[],
    // min-width: 1200px
    number[],
    // min-width: 1600px
    number[],
  ],
) => (pluck: object) =>
  typography
    .map(baseFontScale =>
      shevy({
        baseFontScale,
      }),
    )
    .reduce(
      (acc, shevy) =>
        Object.keys(pluck).reduce((join, key) => {
          const { fontSize, lineHeight, marginBottom } = defaultsDeep(
            acc[key],
            {
              fontSize: [],
              lineHeight: [],
              marginBottom: [],
            },
          )

          return {
            ...join,
            [key]: {
              fontSize: fontSize.concat(shevy[key].fontSize),
              lineHeight: lineHeight.concat(shevy[key].lineHeight),
              marginBottom: marginBottom.concat(shevy[key].marginBottom),
            },
          }
        }, {}),
      {},
    )
export const render = (f: { (): React.ReactNode | undefined }) => f()

export type MediaType = keyof typeof media

export { Text, Frame, Header, Button, DealWithIt, Spinner }
