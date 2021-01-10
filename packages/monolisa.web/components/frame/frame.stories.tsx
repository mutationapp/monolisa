import React from 'react'
import Frame, { frameWeights } from '.'
import PropTypes, { InferProps } from 'prop-types'

import { getBaseStyles } from '../styles'
import { headerKinds, repeat } from '../../typography'
import defaultsDeep from 'lodash.defaultsdeep'

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

const patterns = {
  '1': Array(4).fill(`"${repeat(16)('content')}"
  "${repeat(16)('content')}" / ${repeat(16)('1fr')}\n${repeat(16)(
    'image',
  )}" / ${repeat(16)('1fr')}`),
  '2': Array(4).fill(
    `"${repeat(10)('content')} ${repeat(6)('image')}" / ${repeat(16)('1fr')}`,
  ),
  '3': Array(4).fill(
    `"${repeat(10)('image')} ${repeat(6)('content')}" / ${repeat(16)('1fr')}`,
  ),
  '4': Array(4).fill(
    `"${repeat(8)('image')} ${repeat(8)('content')}" / ${repeat(16)('1fr')}`,
  ),
  '5': Array(4).fill(
    `"${repeat(16)('content')}" / ${repeat(16)('1fr')}
     "${repeat(16)('image')}" / ${repeat(16)('1fr')}`,
  ),
}

console.log(
  `"${repeat(16)('content')}" / ${repeat(16)('1fr')}\n"${repeat(16)(
    'image',
  )}" / ${repeat(16)('1fr')}`,
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
    headingText: {
      control: {
        type: 'text',
      },
    },
    brand: {
      control: {
        type: 'text',
      },
    },
    pattern: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
  },
}

const Template = args => {
  const kind = args.of || 'h3'
  const pattern = args.pattern.toString()

  const split = isNaN(args.split) ? 8 : args.split || 16

  return (
    <Layout {...args}>
      <Frame
        {...defaultsDeep(
          {
            ...args,
            heading: {
              text: args.headingText,
              subHead: args.subHead,
            },
          },
          {
            of: 'h3',
            text: 'Voodoo In my Blood',
            weight: 'fullBleed',
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
              text: 'args.headingText',
              subHead:
                'Labore non ut tempor reprehenderit excepteur est nostrud sit ad ad aliquip. Do cupidatat labore in qui. Ex ea aliquip proident irure ut cupidatat qui officia. Minim id nostrud culpa esse. Reprehenderit aliquip cillum ipsum mollit Lorem. Excepteur aliqua est nulla pariatur ea amet laborum quis labore. Do aliquip reprehenderit officia labore incididunt adipisicing labore anim ullamco sunt occaecat.',
            },
            grid: patterns[pattern],
          },
        )}
      ></Frame>
    </Layout>
  )
}

export const Primary = Template.bind({})
Primary['args'] = {
  of: 'h3',
  weight: 'fullBleed',
  brand: 'MASSIVE ATTACK',
  headingText: 'Voodoo In My Blood',
  subHead: `Voodoo in my blood is livid
  Blood take, I'm chillin'
  Chill me got the soul of a mimic
  It's not quite right, you must be a cynic
  Sign of the wars is my grinning
  Come in to my time and see me
  Sock it to me, sock it to me, timid
  I'm yours, I'm yours
  Why does the blood never stick to your teeth?
  Momma, stop giving me grief
  Why does the blood always stick to your teeth?
  Momma, stop giving me grief
  Why does the blood always stick to your teeth?
  Momma, stop giving me grief
  Barely, barely grieving
  Keep the front door open
  Wipe that cheeky grin and come on, now
  Barely, barely grieving
  Keep the front door open
  Wipe that cheeky grin and come on, now`,
  pattern: 1,
  // grid: Array(4).fill(
  //   `"${repeat(4)('content')} ${repeat(12)('image')}" / ${repeat(16)('1fr')}`,
  // ),
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
