import React from 'react'
import Frame, { frameWeights } from '.'
import PropTypes, { InferProps } from 'prop-types'

import { getBaseStyles } from '../styles'
import { headerKinds } from '../../typography'

const Layout: React.FunctionComponent = ({ children }) => (
  <div>
    <style>{getBaseStyles()}</style>

    <div className={'html dark'}>
      <div className="body">{children}</div>
    </div>
  </div>
)

// Frame.propTypes = {
//   weight: PropTypes.oneOf<'fullBleed' | 'regular' | 'medium' | 'bold'>([
//     'fullBleed',
//     'regular',
//     'medium',
//     'bold',
//   ]),
// }

console.log(
  `🚀 ~ file: frame.stories.tsx ~ line 20 ~ Frame.propTypes`,
  Frame.propTypes,
)

export default {
  title: 'Example/Frames',
  component: Frame,
  argTypes: {
    of: {
      control: {
        type: 'select',
        options: Object.keys(headerKinds),
      },
    },
    weight: {
      control: {
        type: 'select',
        options: Object.keys(frameWeights),
      },
    },
  },
}

const Template = args => {
  const kind = args.of || 'h3'
  return (
    <Layout {...args}>
      <Frame
        {...{
          weight: args.weight,
          brand: 'monolisa',
          image: {
            alt: 'test',
            position: 'left',
            src: '/static/images/structure-light-led-movement-158826.jpeg',
            unoptimized: true,
          },
          cta: [{ children: 'Play Video', of: kind }],
          heading: {
            kind,
            text: 'Frame Heading',
            subHead:
              'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
          },
        }}
      ></Frame>
    </Layout>
  )
}

export const Primary = Template.bind({})
Primary['args'] = {
  of: 'h3',
  weight: 'fullBleed',
  // primary: true,
  // label: 'Button',
}

// export const Secondary = Template.bind({})
// Secondary['args'] = {
//   label: 'Button',
// }

// export const Large = Template.bind({})
// Large['args'] = {
//   size: 'large',
//   label: 'Button',
// }

// export const Small = Template.bind({})
// Small['args'] = {
//   size: 'small',
//   label: 'Button',
// }
