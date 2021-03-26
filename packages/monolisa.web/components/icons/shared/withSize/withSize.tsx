import React from 'react'
import { IconType } from '../..'
export type IconDirectionType = 'up' | 'right' | 'down' | 'left'
export type IconAlignType = 'left' | 'right' | 'justify'

const withSize = (Component: IconType) => {
  const Wrapped: IconType = ({ width, height, size, ...rest }) => {
    const props = {
      ...rest,
      width: width || size || '1em',
      height: height || size || '1em',
      size: size || '1em',
    }

    return <Component {...props} />
  }

  Wrapped.displayName = Component.displayName || Component.name

  return Wrapped
}

export default withSize
