import { useRouter } from 'next/router'
import { useRepositoryRouteType } from '.'
import { buildRepositoryUrl, buildUrlType } from '../../server/shared'
import { integrationProviderType } from 'monolisa.model'
import { buildQuery } from 'monolisa.lib/utils/url'

const useRepositoryRoute: useRepositoryRouteType = () => {
  const { asPath } = useRouter()

  const query = (() => {
    const paths = asPath.split('/').filter(Boolean)

    const provider = paths[0] as integrationProviderType

    if (provider !== 'github') {
      return
    }

    const owner = paths[1]
    const repo = paths[2]

    if (!owner || !repo) {
      return
    }

    const base = {
      provider,
      owner,
      repo,
    }

    const third = paths[3]

    if (third !== 'tree' && third !== 'blob') {
      return {
        ...base,
        pullNumber: third === 'settings' ? undefined : third,
      }
    }

    return {
      ...base,
      path: paths.concat().slice(4, paths.length).join('/'),
      pullNumber: paths[4],
    }
  })()

  if (!query) {
    return
  }

  const { owner, repo, provider } = query

  const overview = buildRepositoryUrl({
    owner,
    repo,
    provider,
  })()

  const buildSectionUrl: (section: string) => buildUrlType = section => ({
    as: `${overview.as}/${section}`,
    href: `/jobs/${section}?${buildQuery({
      owner,
      repo,
      provider,
    })}`,
  })

  return {
    query,
    build: buildRepositoryUrl(query),
    overview,
    settings: buildSectionUrl('settings'),
    pulls: buildSectionUrl('pulls'),
  }
}

export default useRepositoryRoute
