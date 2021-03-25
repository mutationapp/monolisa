import { Octokit } from '@octokit/rest'
import { getRepoType } from '.'

const getRepo: getRepoType = async ({ auth, repo, owner }) => {
  const octokit = new Octokit({
    auth,
  })

  try {
    const response = await octokit.repos.get({
      auth,
      repo,
      owner,
    })

    const { data } = response
    return {
      id: data.id.toString(),
      url: data.url,
      name: data.name,
      owner: data.owner?.login as string,
      private: data.private,
    }
  } catch (error) {
    return
  }
}
export default getRepo
