import { onlyNil } from 'monolisa.lib/utils/object'
import { AppError } from 'monolisa.lib/error'
import { getInstallation } from 'monolisa.integration'

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATEKEY,
} = process.env

const getAppInstallation = async (installationId: number) => {
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

  return await getInstallation({
    id: parseInt(GITHUB_APP_ID),
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----\n${GITHUB_APP_PRIVATEKEY}\n-----END RSA PRIVATE KEY-----`,
    installationId,
  })
}

export default getAppInstallation
