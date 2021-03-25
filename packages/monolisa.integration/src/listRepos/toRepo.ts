import { repoType } from 'monolisa.model'

type toRepoType = (item: {
  id: number
  url: string
  name: string
  private: boolean
  owner: {
    login: string
  }
}) => repoType
export const toRepo: toRepoType = item => {
  const { id, url, name, owner } = item
  return {
    id: id.toString(),
    url,
    name,
    owner: owner.login,
    private: item.private,
  }
}
