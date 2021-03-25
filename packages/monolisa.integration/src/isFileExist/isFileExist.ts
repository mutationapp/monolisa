import { Octokit } from '@octokit/rest'
import { isFileExistType } from '.'

const isFileExist: isFileExistType = async ({ auth, repo, owner, path }) => {
  // Temporary
  return true

  const octokit = new Octokit({
    auth,
  })
  try {
    await octokit.repos.getContent({
      method: 'HEAD',
      owner,
      repo,
      path: path.replace(/^\/+/g, ''),
    })

    return true
  } catch (error) {
    if (error.status === 404) {
      return false
    } else {
      throw error
    }
  }
}

export default isFileExist
