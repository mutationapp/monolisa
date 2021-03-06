import { getEnv } from '../env'
import crypto from 'crypto'

const { monolisa_PRIVATE_KEY, monolisa_PUBLIC_KEY } = getEnv()

const wrap = (key: string, type: 'public' | 'private') => {
  return type === 'private'
    ? `-----BEGIN RSA PRIVATE KEY-----\n${key}\n-----END RSA PRIVATE KEY-----`
    : `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`
}

export const encrypt = (value: string, key = monolisa_PUBLIC_KEY) => {
  return crypto
    .publicEncrypt(
      {
        key: wrap(key, 'public'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(value),
    )
    .toString('base64')
}

export const decrypt = (value: string, key = monolisa_PRIVATE_KEY) => {
  return crypto
    .privateDecrypt(
      {
        key: wrap(key, 'private'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(value, 'base64'),
    )
    .toString()
}
