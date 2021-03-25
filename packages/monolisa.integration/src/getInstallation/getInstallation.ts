import { Octokit } from '@octokit/rest'
import { getInstallationType } from '.'
import { createAppAuth } from '@octokit/auth-app'
import { onlyNil } from 'monolisa.lib/utils/object'

const getInstallation: getInstallationType = async ({
  id,
  privateKey,
  installationId,
  clientId,
  clientSecret,
}) => {
  // https://github.com/octokit/auth-app.js
  if (!id || !installationId || !privateKey || !clientSecret || !clientId) {
    console.error('REQUIRED:', {
      id,
      installationId,
      clientId,
      ...onlyNil({
        privateKey,
        clientSecret,
      }),
    })

    return
  }

  try {
    const auth = createAppAuth({
      appId: id,
      privateKey,
      installationId,
      clientId,
      clientSecret,
    })

    const { token } = await auth({ type: 'app' })

    const octokit = new Octokit({
      auth: token,
    })

    const { data } = await octokit.apps.getInstallation({
      installation_id: installationId,
    })

    const { account } = data

    const login = account?.login
    if (!login) {
      return
    }

    return {
      login,
      installationId,
    }
  } catch (error) {
    console.error(`getInstallation`, error)
  }
}

export default getInstallation
