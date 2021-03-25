import { Octokit } from '@octokit/rest'
import { getBlobType } from '.'

const getBlob: getBlobType = async ({ auth, repo, owner, ref, path }) => {
  const octokit = new Octokit({
    auth,
  })

  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      ref,
      path: path.replace(/^\/+/g, ''),
    })

    if (!response) {
      return
    }

    // TODO: Will fix it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = response as any

    return {
      content: data.content,
      encoding: data.encoding,
      sha: data.sha,
      size: data.size,
      url: data.url,
    }
  } catch (error) {
    console.error('getBlob', error)
  }
}
export default getBlob
