import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const CommitIcon: IconType = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <circle cx={12} cy={12} r={4} />
      <path d="M1.05 12H7M17.01 12h5.95" />
    </svg>
  )
}

export default withSize(CommitIcon)
