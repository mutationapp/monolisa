import { Fragment } from 'react'
import { Frame } from '../components'

const Index = () => {
  const kind = 'h3'

  return (
    <Fragment>
      <section>
        <Frame
          weight="bold"
          span={{
            'min-width: 0px': '16',
            'min-width: 600px': '16',
            'min-width: 900px': '16',
            'min-width: 1200px': '16',
            'min-width: 1600px': '16',
          }}
          brand={'monolisa'}
          image={{
            alt: 'test',
            src: '/static/images/structure-light-led-movement-158826.jpeg',
          }}
          cta={[{ children: 'Play Video', of: kind }]}
          heading={{
            kind,
            text: 'Frame Heading',
            subHead:
              'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
          }}
        ></Frame>
        {/* <Frame
          span={{
            'min-width: 0px': '16',
            'min-width: 600px': '16',
            'min-width: 900px': '16',
            'min-width: 1200px': '16',
            'min-width: 1600px': '16',
          }}
        >
          <Header kind="h1" text={'H1 Title'} />
          <Header kind="h2" text={'H2 Title'} />
          <Header kind="h3" text={'H3 Title'} />
          <Header kind="h4" text={'H4 Title'} />
          <Header kind="h5" text={'H5 Title'} />
          <Header kind="h6" text={'H6 Title'} />
        </Frame> */}
      </section>
    </Fragment>
  )
}

export default Index
