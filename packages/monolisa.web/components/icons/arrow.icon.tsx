import { IconType } from '.'
import { withSize } from './shared'

const ArrowIcon: IconType = ({ direction, filled, ...props }) => {
  const rotate = (() => {
    if (direction === 'up') return -90
    if (direction === 'right') return 0
    if (direction === 'down') return 90
    if (direction === 'left') return 180
  })()
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? props.color : 'none'}
      shapeRendering="geometricPrecision"
      {...props}
    >
      <style jsx>{`
        svg {
          transform: rotate(${rotate}deg);
        }
      `}</style>
      <circle cx={12} cy={12} r={10} />
      <path d="M12 16l4-4-4-4M8 12h8" />
    </svg>
  )
}

export default withSize(ArrowIcon)
