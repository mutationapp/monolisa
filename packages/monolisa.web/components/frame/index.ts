import { HeaderKindType, MediaType } from '../../typography'
import { ButtonPropsType } from '../button'
import Frame from './frame'

export type FrameSpanType = {
  [key in MediaType]: '12' | '16'
}

export type FrameHeadingType = {
  kind: HeaderKindType
  text: string
  subHead?: string
}

export const getHeading = (
  heading: string | FrameHeadingType,
): {
  kind: HeaderKindType
  text: string
  subHead?: string
} => {
  return typeof heading === 'string'
    ? ({
        kind: 'h1',
        text: heading,
      } as FrameHeadingType)
    : heading
}

export type FramePropsType = {
  weight?: 'fullBleed' | 'regular' | 'medium' | 'bold'
  span?: FrameSpanType
  heading:
    | string
    | {
        kind: HeaderKindType
        text: string
        subHead?: string
      }
  brand?: string
  cta?: Array<ButtonPropsType & { children: string }>
  image?: {
    src: string
    alt: string
    position?: 'fit' | 'left' | 'right'
    unoptimized?: boolean
  }
}

export default Frame
