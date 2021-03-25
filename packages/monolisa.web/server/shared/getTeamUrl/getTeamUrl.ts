import { getTeamUrlType } from '.'

const getTeamUrl: getTeamUrlType = teamSlug => area => {
  if (['danger', 'invite'].includes(area)) {
    const { as, href } = getTeamUrl(teamSlug)('settings')

    return {
      as: `${as}?section=${area}`,
      href,
    }
  }
  return {
    as:
      area === 'repositories'
        ? `/teams/${teamSlug}`
        : `/teams/${teamSlug}/${area}`,
    href: `/teams/${area}?teamSlug=${teamSlug}`,
  }
}

export default getTeamUrl
