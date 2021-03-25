import crypto from 'crypto'
import { hashType } from '../..'

const hash: hashType = value => {
  return crypto.createHash('md5').update(value).digest('hex')
}

export default hash
