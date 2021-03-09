import { useState } from 'react'
import { Fragment } from 'react'
import { Frame, render } from '../components'
import { ArrowIcon, LinkIcon } from '../components/icons'
import { frameWeights, FrameWeightType } from '../components/frame'
import { useThemeContext } from '../hooks'
import { useRouter } from 'next/dist/client/router'
import ponyo, { appRouterType } from '../store.ghibli/apps/ponyo'
import { themeContextDefaults } from '../hooks/useThemeContext/useThemeContext'
import { GetServerSideProps, NextPage } from 'next'
import { map, flatMap, pluck } from 'rxjs/operators'
import { mergeMap } from 'rxjs/operators'
import { forkJoin, from, of } from 'rxjs'
import { MDXProvider } from '@mdx-js/react'

const Index: NextPage = props => {
  const { bit, fontSize, ...rest } = useThemeContext()

  const [weight, setWeight] = useState<FrameWeightType>(
    frameWeights.medium as FrameWeightType,
  )

  return (
    <MDXProvider>
      {render(() => {
        const kind = 'h3'

        return (
          <Fragment key={kind}>
            <section>
              <Frame
                {...{
                  weight,
                  brand: `U=${bit || '...'}`,
                  image: {
                    alt: 'test',
                    position: 'left',
                    src: '/static/images/ponyo.png',
                  },
                  cta: [
                    {
                      children: {
                        medium: 'bold',
                        bold: 'regular',
                        regular: 'medium',
                        fullBleed: 'regular',
                      }[weight],
                      of: kind,
                      icon: <ArrowIcon />,
                      onClick: e => {
                        setWeight(
                          {
                            medium: 'bold',
                            bold: 'regular',
                            regular: 'medium',
                            fullBleed: 'regular',
                          }[weight] as FrameWeightType,
                        )
                      },
                    },
                    {
                      of: kind,
                      children: 'composition-layout',
                      icon: <LinkIcon />,
                      link: {
                        href: 'https://brand.uber.com/guide#composition-layout',
                      },
                    },
                  ],
                  heading: {
                    kind,
                    text: `${kind.toUpperCase()} font-size: ${
                      rest[kind]?.fontSize || '...'
                    }`,
                    subHead:
                      'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
                  },
                }}
              ></Frame>
            </section>
          </Fragment>
        )
      })}
    </MDXProvider>
  )
}

// export const getServerSideProp: GetServerSideProps = async context => {
//   const { bit, width } = themeContextDefaults

//   const monolisa = ponyo({ timeStamp: Date.now() })({
//     router: {
//       locale: context.locale,
//       path: context.resolvedUrl,
//     } as appRouterType,
//   })

//   const frames = await monolisa?.frames
//     .pipe(map(v => v[0].render({ bit, width })))
//     .toPromise()

//   return {
//     props: { frames, a: 1 },
//   }
// }

// Index.getInitxialProps = async context => {
//   const { bit, width } = themeContextDefaults

//   const monolisa = ponyo({ timeStamp: Date.now() })({
//     router: {
//       locale: 'en-GB',
//       path: context.asPath,
//     } as appRouterType,
//   })

//   const frames = monolisa?.frames.pipe(x =>
//     x.pipe(map(async y => await y[0]?.render({ bit, width }))),
//   )

//   const ttt = forkJoin(Object.keys(frames))
//   frames.subscribe(async x => console.log(await x, 'asasasass'))

//   return {
//     props: {
//       frames: await ttt.toPromise(),
//       a: (
//         await (await (await monolisa?.frames.toPromise()).toPromise()).render({
//           bit,
//           width,
//         })
//       )?.['props'],
//     },
//   }
// }

export const getServerSideProps: GetServerSideProps = async context => {
  const { bit, width } = themeContextDefaults

  const monolisa = ponyo({ timeStamp: Date.now() })({
    router: {
      locale: 'en-GB',
      path: context.resolvedUrl,
    } as appRouterType,
  })

  const frames = monolisa?.frames.pipe(
    map(x =>
      from(
        (async () => {
          return {
            a: 1,
          }
          // return (await (await x.toPromise()).render.toPromise()).call({
          //   bit,
          //   width,
          // })
        })(),
      ),
    ),
  )

  // const ttt = forkJoin(Object.keys(frames))
  monolisa?.frames.subscribe(x =>
    console.log(
      x.subscribe(x => console.log(x, '!')),
      '2',
    ),
  )

  return {
    props: {
      // frames: frames,
      // a: (
      //   await (await (await monolisa?.frames.toPromise()).toPromise()).render({
      //     bit,
      //     width,
      //   })
      // )?.['props'],
    },
  }
}

export default Index
