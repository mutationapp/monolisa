import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const MergeIcon: IconType = props => {
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
      <circle cx={18} cy={18} r={3} />
      <circle cx={6} cy={6} r={3} />
      <path d="M6 21V9a9 9 0 009 9" />
    </svg>
  )
}

export default withSize(MergeIcon)
