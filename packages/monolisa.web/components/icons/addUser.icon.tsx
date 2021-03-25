import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const AddUserIcon: IconType = props => {
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
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx={8.5} cy={7} r={4} />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  )
}

export default withSize(AddUserIcon)
