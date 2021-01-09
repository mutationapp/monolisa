import React from 'react'

import { Button } from '../../stories/Button'
import { headerKinds } from '../../typography'
import { getBaseStyles } from '../styles'
import Header from '.'

const Layout: React.FunctionComponent = ({ children }) => (
  <div>
    <style>{getBaseStyles()}</style>

    <div className={'html dark'}>
      <div className="body">{children}</div>
    </div>
  </div>
)

export default {
  title: 'Example/Headers',
  component: Header,
  // argTypes: {
  //   // kind: {
  //   //   control: {
  //   //     type: 'select',
  //   //     options: ['all'].concat(Object.keys(headerKinds)),
  //   //   },
  //   // },
  //   // text: {
  //   //   control: {
  //   //     type: 'text',
  //   //   },
  //   // },
  // },
}

const [H1, H2, H3, H4, H5, H6] = Object.keys(headerKinds).map(kind => {
  const H = args => {
    const { kind, text } = args
    return (
      <Layout {...args}>
        <Header kind={kind} text={text} />
      </Layout>
    )
  }

  H.args = {
    kind,
    text: `${kind.toUpperCase()} Title`,
    f: 'dddd',
  }

  // H.propTypes = HeaderPropTypes

  return H
})

export { H1, H2, H3, H4, H5, H6 }
