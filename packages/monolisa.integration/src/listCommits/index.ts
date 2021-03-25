import listCommits from './listCommits'
import { withAuthType } from 'monolisa.model'

export type lisCommitItemType = {
  sha: string
  parent: string[]
}
export type listCommitsType = (
  payload: withAuthType & {
    owner: string
    repo: string
    sha?: string
    perPage?: number
  },
) => Promise<lisCommitItemType[] | undefined>

export default listCommits
