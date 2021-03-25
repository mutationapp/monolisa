import getBlob from './getBlob'
import getCommit from './getCommit'
import getInstallation from './getInstallation'
import getRepo from './getRepo'
import isFileExist from './isFileExist'
import listCommits from './listCommits'
import listRepos from './listRepos'

import injectCreateClient from './createClient'

import { onlyNil } from 'monolisa.lib/utils/object'
import { AppError } from 'monolisa.lib/error'
import { getEnv } from 'monolisa.lib/env'

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATEKEY,
} = getEnv()

if (
  !GITHUB_CLIENT_ID ||
  !GITHUB_CLIENT_SECRET ||
  !GITHUB_APP_ID ||
  !GITHUB_APP_PRIVATEKEY
) {
  throw new AppError(
    'REQUIRED:',
    onlyNil({
      GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET,
      GITHUB_APP_ID,
      GITHUB_APP_PRIVATEKEY,
    }),
  )
}

export const createClient = (auth: string | number) =>
  injectCreateClient(
    typeof auth === 'number'
      ? {
          id: parseInt(GITHUB_APP_ID),
          clientId: GITHUB_CLIENT_ID,
          clientSecret: GITHUB_CLIENT_SECRET,
          installationId: auth,
          privateKey: `-----BEGIN RSA PRIVATE KEY-----\n${GITHUB_APP_PRIVATEKEY}\n-----END RSA PRIVATE KEY-----`,
        }
      : auth,
  )

export {
  getBlob,
  getCommit,
  getInstallation,
  getRepo,
  isFileExist,
  listCommits,
  listRepos,
}
