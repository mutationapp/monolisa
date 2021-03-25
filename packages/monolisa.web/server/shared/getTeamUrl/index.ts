import getTeamUrl from './getTeamUrl'

export type getTeamUrlType = (
  teamSlug: string,
) => (
  area:
    | 'repositories'
    | 'installations'
    | 'settings'
    | 'import'
    | 'danger'
    | 'invite',
) => { as: string; href: string }
export default getTeamUrl
