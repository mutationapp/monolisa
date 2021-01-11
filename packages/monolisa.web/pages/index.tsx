import { useState } from 'react'
import { Fragment } from 'react'
import { Frame, render } from '../components'
import { ArrowIcon, LinkIcon } from '../components/icons'
import { frameWeights, FrameWeightType } from '../components/frame'
import { useThemeContext } from '../hooks'

const Index = () => {
  const { uFrame } = useThemeContext()

  const [weight, setWeight] = useState<FrameWeightType>(
    frameWeights.medium as FrameWeightType,
  )

  return (
    <Fragment>
      {render(() => {
        const kind = 'h3'

        const { bit, fontSize, ...rest } = uFrame

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
                    src:
                      '/static/images/structure-light-led-movement-158826.jpeg',
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
    </Fragment>
  )
}

export default Index
