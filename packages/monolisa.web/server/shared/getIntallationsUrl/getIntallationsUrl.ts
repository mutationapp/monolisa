import { getTeamUrl } from '..'

const getIntallationsUrl = (teamSlug?: string) => {
  if (teamSlug) {
    return getTeamUrl(teamSlug)('installations')
  }

  return {
    as: `/installations`,
    href: `/installations`,
  }
}

export default getIntallationsUrl
