import getUrl from './getUrl'

export type getUrlType = (
  slug: string,
) => (
  area:
    | 'repositories'
    | 'installations'
    | 'account'
    | 'import'
    | 'teams'
    | 'teams/new',
) => { as: string; href: string }
export default getUrl
