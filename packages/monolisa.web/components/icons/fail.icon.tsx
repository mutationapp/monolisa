import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const FailIcon: IconType = props => {
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
      <circle cx={12} cy={12} r={10} fill="var(--geist-fill)" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="var(--geist-stroke)" />
    </svg>
  )
}

export default withSize(FailIcon)
