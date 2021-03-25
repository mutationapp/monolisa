import { Octokit } from '@octokit/rest'
import { listReposType, toRepo } from './index'
import { somethingWentWrong } from 'monolisa.lib'

const listRepos: listReposType = async (auth, installationId) => {
  const octokit = new Octokit({
    auth,
  })

  try {
    if (installationId) {
      const response = await octokit.apps.listInstallationReposForAuthenticatedUser(
        { installation_id: installationId },
      )

      return response.data.repositories.map(r => toRepo(r))
    }

    const response = await octokit.repos.listForAuthenticatedUser()

    return (
      response.data.map(r =>
        toRepo({
          ...r,
          owner: {
            ...r.owner,
            login: r.owner?.login as string,
          },
        }),
      ) || []
    )
  } catch (error) {
    if (error.status === 404) {
      return
    }

    console.error(somethingWentWrong, { error })
  }
}
export default listRepos
