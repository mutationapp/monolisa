import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const CodeIcon: IconType = props => {
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
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  )
}

export default withSize(CodeIcon)
