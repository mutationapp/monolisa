import { Fragment } from 'react'
import { Frame } from '../components'
import { useThemeContext } from '../hooks'
import { headerKinds, HeaderKindType } from '../typography'

const Index = () => {
  const { uFrame } = useThemeContext()

  return (
    <Fragment>
      {['h3'].map(headerKind => {
        const kind = headerKind as HeaderKindType

        const { bit, fontSize, ...rest } = uFrame(kind)
        return (
          <Fragment key={kind}>
            <section>
              <Frame
                weight="medium"
                brand={`U=${bit}`}
                image={{
                  alt: 'test',
                  position: 'left',
                  src:
                    '/static/images/structure-light-led-movement-158826.jpeg',
                }}
                // cta={[{ children: 'Play Video', of: kind }]}
                heading={{
                  kind,
                  text: `${kind.toUpperCase()} font-size: ${
                    rest[kind]?.fontSize
                  }`,
                  subHead:
                    'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
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
