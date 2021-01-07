import { HeaderKindType, MediaType } from '../../typography'
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

export default Frame
