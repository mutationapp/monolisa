import isFileExist from './isFileExist'
import { withAuthType } from 'monolisa.model'
export type isFileExistType = (
  payload: withAuthType & {
    owner: string
    repo: string
    path: string
  },
) => Promise<boolean>

export default isFileExist
