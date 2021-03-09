import { HeaderKindType } from '../../typography'
import { ButtonPropsType } from '../button'
import Frame from './frame'

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

export const frameWeights = {
  fullBleed: 'fullBleed',
  regular: 'regular',
  medium: 'medium',
  bold: 'bold',
}

export type FrameWeightType = keyof typeof frameWeights

export type FrameImageType = {
  src: string
  alt: string
  position?: 'fit' | 'left' | 'right'
  unoptimized?: boolean
}

export type FramePropsType = {
  heading:
    | string
    | {
        kind: HeaderKindType
        text: string
        subHead?: string
      }
  brand?: string
  cta?: Array<ButtonPropsType & { children: string }>
  image?: FrameImageType
  // grid?: string
  // frames?: FramePropsType[]
}

export type FrameListPropsType = FramePropsType & {
  weight?: FrameWeightType
  // heading:
  //   | string
  //   | {
  //       kind: HeaderKindType
  //       text: string
  //       subHead?: string
  //     }
  // brand?: string
  // cta?: Array<ButtonPropsType & { children: string }>
  // image?: {
  //   src: string
  //   alt: string
  //   position?: 'fit' | 'left' | 'right'
  //   unoptimized?: boolean
  // }
  grid?: string
  frames?: FramePropsType[]
}

export default Frame
