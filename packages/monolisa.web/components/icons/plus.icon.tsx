import { IconType } from '.'
import { withSize } from './shared'

const PlusIcon: IconType = props => {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export default withSize(PlusIcon)
