import Frame from './frame'
console.log(`🚀 ~ file: frame.stories.tsx ~ line 2 ~ Frame`, Frame)

const Template = args => <Frame {...args} />

const Default = Template.bind({})
Default['args'] = {
  weight: 'fullBleed',
  span: {
    'min-width: 0px': '16',
    'min-width: 600px': '16',
    'min-width: 900px': '16',
    'min-width: 1200px': '16',
    'min-width: 1600px': '16',
  },
  brand: 'monolisa',
  image: {
    alt: 'test',
    position: 'left',
    src: '/static/images/structure-light-led-movement-158826.jpeg',
  },
  cta: [{ children: 'Play Video', of: 'h1' }],
  heading: {
    kind: 'h1',
    text: 'Frame Heading',
    subHead:
      'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
  },
}

export default {
  title: 'Default',
  component: Template,
  argTypes: {
    weight: 'fullBleed',
    span: {
      'min-width: 0px': '16',
      'min-width: 600px': '16',
      'min-width: 900px': '16',
      'min-width: 1200px': '16',
      'min-width: 1600px': '16',
    },
    brand: 'monolisa',
    image: {
      alt: 'test',
      position: 'left',
      src: '/static/images/structure-light-led-movement-158826.jpeg',
    },
    cta: [{ children: 'Play Video', of: 'h1' }],
    heading: {
      kind: 'h1',
      text: 'Frame Heading',
      subHead:
        'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
    },
  },
}
