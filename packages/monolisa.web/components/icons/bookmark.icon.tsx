import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'
import classNames from 'classnames'
import { css } from '@emotion/css'

const BookmarkIcon: IconType = ({ className, ...props }) => {
  return (
    <span
      className={classNames(
        className,
        css({
          lineHeight: 1,
        }),
      )}
    >
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
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    </span>
  )
}

export default withSize(BookmarkIcon)
