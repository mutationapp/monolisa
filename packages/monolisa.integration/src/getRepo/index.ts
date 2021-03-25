import getRepo from './getRepo'
import { repoType, withAuthType } from 'monolisa.model'

export type getRepoType = (
  payload: withAuthType & { owner: string; repo: string },
) => Promise<repoType | undefined>
export default getRepo
