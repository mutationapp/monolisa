import { MediaType } from '../../typography'
import Frame from './frame'

export type FrameSpanType = {
  [key in MediaType]: '12' | '16'
}

export default Frame
