import { getUrlType } from '.'

const getUrl: getUrlType = slug => area => {
  const map = {
    repositories: `/${slug}`,
  }

  return {
    as: map[area] || `/${slug}/${area}`,
    href: `/${area}?slug=${slug}`,
  }
}

export default getUrl
