import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const AlignIcon: IconType = props => {
  const align = props.align || 'justify'

  if (align === 'left') {
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
        <path d="M17 10H3M21 6H3M21 14H3M17 18H3" />
      </svg>
    )
  }
  if (align === 'right') {
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
        <path d="M21 10H7M21 6H3M21 14H3M21 18H7" />
      </svg>
    )
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
      fill="none"
      shapeRendering="geometricPrecision"
      color="var(--geist-foreground)"
      {...props}
    >
      <path d="M21 10H3M21 6H3M21 14H3M21 18H3" />
    </svg>
  )
}

export default withSize(AlignIcon)
