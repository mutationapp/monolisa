import jwt from 'jsonwebtoken'

export type signRepositoryType = (key: string) => string
export const signRepository: signRepositoryType = key => {
  return jwt.sign(key, 'KEY')
}

export type decodeRepositoryType = (token: string) => string
export const decodeRepository: decodeRepositoryType = (token: string) => {
  return jwt.decode(token) as string
}

export const signMemberToken = (token?: string) =>
  token ? jwt.sign(token, 'member') : undefined

export const decodeMemberToken = (token?: string) =>
  token ? (jwt.decode(token) as string) : undefined

export const signProviderStateToken = (token?: string) =>
  token ? jwt.sign(token, 'providerState') : undefined

export const decodeProviderStateToken = (token?: string) =>
  token ? (jwt.decode(token) as string) : undefined
