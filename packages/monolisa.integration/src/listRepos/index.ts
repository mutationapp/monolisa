import { repoType } from 'monolisa.model'
import listRepos from './listRepos'
import { toRepo } from './toRepo'

export type listReposType = (
  auth: string,
  installationId?: number,
) => Promise<repoType[] | undefined>

export { listRepos as default, toRepo }
