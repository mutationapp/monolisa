import { Grid } from '../../../components'
import { localesType } from '../../../i18n'

import { from, Observable, of, pipe } from 'rxjs'
import { concatMap, delay, timeout } from 'rxjs/operators'

export type frameType = {
  delay?: number
  render: Observable<(payload: { bit: number; width: number }) => JSX.Element>
}

export type configHashTableType = {
  [key: string]: frameType
}

export type metaType = {
  [key: string]: configHashTableType
}

export type monolisaFontType = {
  [key: string]: {
    media: {
      [key: string]: number
    }
    typography: [number[]]
    fontFamily: { name: string; src: string }[]
  }
}

export type monolisaResponseType = {
  frames: Observable<Observable<frameType>>
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const closest = (goal: number) => (prev: number, curr: number) =>
  Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev

const cache: {
  timeStamp?: number
} = {
  timeStamp: undefined,
}

export type appRouterType = { locale: localesType; path: '/' }

const ponyo = (options: { timeStamp: number }) =>
  function monolisa(payload: { router: appRouterType }): monolisaResponseType {
    const { router } = payload
    const { timeStamp: now } = options

    if (!cache.timeStamp) {
      cache.timeStamp = now
    }

    const timeStamp = cache.timeStamp

    const { path } = router

    const add = (a: number) => (b: number) => a + b

    // const frames: frameType[] = [
    //   {
    //     render: async ({ width, bit }) => {
    //       const imageProps = {
    //         height:
    //           350 ||
    //           {
    //             1: 1,
    //             '1/2': 1 / 2,
    //             '1/3': 1 / 3,
    //             '2/3': 2 / 3,
    //             '1/4': 1 / 4,
    //           }['1/2'] * width,
    //         width,
    //       }

    //       const result: {
    //         [key: string]: () => JSX.Element
    //       } = {
    //         [timeStamp.toString()]: () => {
    //           return (
    //             <Grid
    //               {...{
    //                 ...{
    //                   width,
    //                   bit,
    //                   title: now.toString(),
    //                   content:
    //                     'Reprehenderit laborum cupidatat officia nisi pariatur pariatur. Reprehenderit sint dolor duis veniam nisi magna adipisicing eiusmod aliqua deserunt. Officia culpa quis adipisicing occaecat nostrud culpa. Officia consequat sit do laborum eu dolor ex consequat et ad mollit id. Ullamco Lorem labore id elit est reprehenderit mollit et aliqua officia id minim. Excepteur elit voluptate sint minim ut fugiat.',
    //                   image: {
    //                     ...imageProps,
    //                     src: '/static/images/ponyo.png',
    //                     alt: 'asds',
    //                   },
    //                   brand: 'Ponyo',
    //                 },
    //               }}
    //             ></Grid>
    //           )
    //         },
    //         [add(timeStamp)(2000).toString()]: () => {
    //           return (
    //             <Grid
    //               {...{
    //                 ...{
    //                   width,
    //                   bit,
    //                   title: 'What is up guys',
    //                   content: 'content',
    //                   image: {
    //                     ...imageProps,
    //                     src: '/static/images/ponyo.png',
    //                     alt: 'asds',
    //                   },
    //                 },
    //               }}
    //             ></Grid>
    //           )
    //         },
    //       }

    //       const key = Object.keys(result)
    //         .map(x => parseInt(x))
    //         .reduce(closest(now))

    //       // if (key - now)
    //       await wait(key - timeStamp)

    //       return result[key.toString()]?.()
    //     },
    //   },
    // ]

    const getImageProps = (width: number) => {
      return {
        height:
          350 ||
          {
            1: 1,
            '1/2': 1 / 2,
            '1/3': 1 / 3,
            '2/3': 2 / 3,
            '1/4': 1 / 4,
          }['1/2'] * width,
        width,
      }
    }

    const array = [
      {
        delay: 2000,
        render: from(
          (async () => ({ width, bit }) => {
            return (
              <Grid
                {...{
                  ...{
                    width,
                    bit,
                    title: now.toString(),
                    content:
                      'Reprehenderit laborum cupidatat officia nisi pariatur pariatur. Reprehenderit sint dolor duis veniam nisi magna adipisicing eiusmod aliqua deserunt. Officia culpa quis adipisicing occaecat nostrud culpa. Officia consequat sit do laborum eu dolor ex consequat et ad mollit id. Ullamco Lorem labore id elit est reprehenderit mollit et aliqua officia id minim. Excepteur elit voluptate sint minim ut fugiat.',
                    image: {
                      ...getImageProps(width),
                      src: '/static/images/ponyo.png',
                      alt: 'asds',
                    },
                    brand: 'Ponyo',
                  },
                }}
              ></Grid>
            )
          })(),
        ),
      },
    ]
    //   {
    //     delay: 1000,
    //     render: async ({ width, bit }) => {
    //       return (
    //         <Grid
    //           {...{
    //             ...{
    //               width,
    //               bit,
    //               title: now.toString(),
    //               content:
    //                 'xxxxxx laborum cupidatat officia nisi pariatur pariatur. Reprehenderit sint dolor duis veniam nisi magna adipisicing eiusmod aliqua deserunt. Officia culpa quis adipisicing occaecat nostrud culpa. Officia consequat sit do laborum eu dolor ex consequat et ad mollit id. Ullamco Lorem labore id elit est reprehenderit mollit et aliqua officia id minim. Excepteur elit voluptate sint minim ut fugiat.',
    //               image: {
    //                 ...getImageProps(width),
    //                 src: '/static/images/ponyo.png',
    //                 alt: 'asds',
    //               },
    //               brand: 'Ponyo',
    //             },
    //           }}
    //         ></Grid>
    //       )
    //     },
    //   },
    // ]

    switch (path) {
      default:
        return {
          frames: from([
            from(array).pipe(concatMap(val => of(val).pipe(delay(val.delay)))),
            // from([
            //   {
            //     delay: 1000,
            //     render: async ({ width, bit }) => {
            //       return (
            //         <Grid
            //           {...{
            //             ...{
            //               width,
            //               bit,
            //               title: now.toString(),
            //               content:
            //                 'Last laborum cupidatat officia nisi pariatur pariatur. Reprehenderit sint dolor duis veniam nisi magna adipisicing eiusmod aliqua deserunt. Officia culpa quis adipisicing occaecat nostrud culpa. Officia consequat sit do laborum eu dolor ex consequat et ad mollit id. Ullamco Lorem labore id elit est reprehenderit mollit et aliqua officia id minim. Excepteur elit voluptate sint minim ut fugiat.',
            //               image: {
            //                 ...getImageProps(width),
            //                 src: '/static/images/ponyo.png',
            //                 alt: 'asds',
            //               },
            //               brand: 'Ponyo',
            //             },
            //           }}
            //         ></Grid>
            //       )
            //     },
            //   },
            // ]).pipe(concatMap(val => of(val).pipe(delay(val.delay)))),
          ]),
        }
    }
  }

export default ponyo
