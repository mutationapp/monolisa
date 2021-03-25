import getCommit from './getCommit'
import { withAuthType } from 'monolisa.model'

export type getCommitType = (
  payload: withAuthType & {
    owner: string
    repo: string
    sha?: string
  },
) => Promise<string | undefined>

export default getCommit
