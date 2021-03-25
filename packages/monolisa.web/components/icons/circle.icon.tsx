import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const CircleIcon: IconType = ({ filled, ...rest }) => {
  const fill =
    typeof filled === 'boolean' && filled
      ? rest.color || 'currentColor'
      : 'none'

  const props = {
    ...rest,
    fill,
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
    </svg>
  )
}

export default withSize(CircleIcon)
