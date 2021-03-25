import { Octokit } from '@octokit/rest'
import { listCommitsType } from '.'

const listCommits: listCommitsType = async ({
  sha,
  owner,
  repo,
  auth,
  perPage,
}) => {
  const octokit = new Octokit({
    auth,
  })

  try {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      ...(sha ? { sha } : {}),
      per_page: perPage,
    })

    return data.map(item => ({
      sha: item.sha as string,
      parent: item.parents.map(parent => parent.sha),
    }))
  } catch (error) {
    return undefined
  }
}

export default listCommits
