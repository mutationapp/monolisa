import { createAppAuth } from '@octokit/auth-app'
import { createClientType } from '.'
import { Octokit } from '@octokit/rest'

const createClient: createClientType = async auth => {
  if (typeof auth === 'string') {
    return new Octokit({
      auth,
    })
  }

  const { id, privateKey, clientId, clientSecret, installationId } = auth

  // https://github.com/octokit/auth-app.js
  const { token } = await createAppAuth({
    appId: id,
    privateKey,
    clientId,
    clientSecret,
    installationId,
  })({ type: 'installation' })

  const octokit = new Octokit({
    auth: token,
  })

  return octokit
}

export default createClient
