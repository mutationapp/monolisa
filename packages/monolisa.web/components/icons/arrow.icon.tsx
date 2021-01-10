import { IconType } from '.'
import { withSize } from './shared'

const ArrowIcon: IconType = props => {
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
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default withSize(ArrowIcon)
