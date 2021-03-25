import { IconType } from '.'
import { withSize } from './shared'

const KeyIcon: IconType = props => {
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
      <path d="M4 17l6-6-6-6M12 19h8" />
    </svg>
  )
}

export default withSize(KeyIcon)
