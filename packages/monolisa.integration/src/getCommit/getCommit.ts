import { listCommits } from '../..'
import { getCommitType } from '.'

const getCommit: getCommitType = async ({ sha, owner, repo, auth }) => {
  const commits = await listCommits({
    sha,
    auth,
    owner,
    repo,
    perPage: 1,
  })

  if (!Array.isArray(commits)) {
    return
  }

  return commits[0].sha
}

export default getCommit
