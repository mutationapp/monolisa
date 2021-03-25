import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const BoxIcon: IconType = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      color="var(--geist-foreground)"
      {...props}
    >
      <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    </svg>
  )
}

export default withSize(BoxIcon)
