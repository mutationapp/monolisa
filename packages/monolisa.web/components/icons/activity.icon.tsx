import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const ActivityIcon: IconType = props => {
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
      color="var(--geist-foreground)"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

export default withSize(ActivityIcon)
