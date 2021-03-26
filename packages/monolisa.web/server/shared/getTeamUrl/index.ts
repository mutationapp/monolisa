import getTeamUrl from './getTeamUrl'

export type getTeamUrlType = (
  teamSlug: string,
) => (
  area:
    | 'profile'
    | 'installations'
    | 'settings'
    | 'import'
    | 'danger'
    | 'invite'
    | 'jobs',
) => { as: string; href: string }
export default getTeamUrl
