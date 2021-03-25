import dotenv from 'dotenv'
import path from 'path'
import { AppError } from '../error'
import { onlyNil } from '../utils/object'
import { getParentPathUntil } from '../utils/url/url.utils'

export type monolisaEnvType =
  | 'development'
  | 'review'
  | 'staging'
  | 'production'

type envType = {
  GITHUB_APP_NAME: string
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  GITHUB_APP_ID: string
  GITHUB_APP_PRIVATEKEY: string
  MUTATE_APP_URL: string
  MUTATE_API_URL: string
  MONOLISA_ENV: monolisaEnvType
  monolisa_PRIVATE_KEY: string
  monolisa_PUBLIC_KEY: string
  [key: string]: string | undefined
}

export const getEnv: () => envType = () => {
  dotenv.config({
    path: path.join(getParentPathUntil(__dirname, 'monolisa'), '.env'),
  })

  const {
    MUTATE_API_URL,
    GITHUB_APP_NAME,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_APP_ID,
    GITHUB_APP_PRIVATEKEY,
    MONOLISA_ENV = 'development',
  } = process.env

  const defaults = {
    MUTATE_API_URL,
    GITHUB_APP_NAME,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_APP_ID,
    GITHUB_APP_PRIVATEKEY,
    MONOLISA_ENV,
  } as envType

  const nil = onlyNil(defaults)

  if (Object.keys(nil).length) {
    console.log(nil)
    throw new AppError('REQUIRED:', nil)
  }

  return {
    ...defaults,
    ...process.env,
  }
}
