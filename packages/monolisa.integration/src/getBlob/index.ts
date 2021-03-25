import { blobType, withAuthType } from 'monolisa.model'
import getBlob from './getBlob'

export type getBlobType = (
  payload: withAuthType & {
    owner: string
    repo: string
    path: string
    ref: string
  },
) => Promise<blobType | undefined>

export default getBlob
