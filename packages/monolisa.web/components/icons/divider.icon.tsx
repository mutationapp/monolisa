import { IconType } from '.'
import { withSize } from './shared'

const DividerIcon: IconType = props => {
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
      <path d="M16.88 3.549L7.12 20.451" />
    </svg>
  )
}

export default withSize(DividerIcon)
