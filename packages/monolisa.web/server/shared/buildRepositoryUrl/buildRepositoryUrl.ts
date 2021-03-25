import { integrationProviderType } from 'monolisa.model'

import { removeLeadingSlashes, buildQuery } from 'monolisa.lib/utils/url'

import {
  buildRepositoryUrlPayloadType,
  buildRepositoryUrlType,
  urlPathType,
  providerUrlPathType,
  buildProviderUrlPayloadType,
} from '..'

export const getProviderBaseUrl = (type: integrationProviderType) => {
  switch (type) {
    case 'github':
      return 'https://github.com'
    default:
      break
  }
}

export const getRepoPath = (payload: { owner: string; repo: string }) => {
  return `/${payload.owner}/${payload.repo}`
}

export const getProviderRepoPath = (
  type: integrationProviderType,
) => (payload: { repo?: string; owner?: string }) => {
  const { repo, owner } = payload
  if (!repo || !owner) {
    return
  }
  switch (type) {
    case 'github':
      return getRepoPath({ repo, owner })
    default:
      break
  }
}

export const getReportPathTitle: (
  path?: string,
) => 'tree' | 'file' | 'repository' | 'Pull requests' | undefined = path => {
  if (!path) {
    return
  }

  const name = removeLeadingSlashes(path)?.split('/')[3]

  const map = {
    tree: 'Tree',
    blob: 'File',
    pulls: 'Pull requests',
    repository: 'Repository',
    settings: 'Settings',
  }

  return map[name || 'repository']
}

export const buildRepositoryUrl: buildRepositoryUrlType = initial => pathType => {
  if (!initial) {
    return {
      href: '/repositories',
    }
  }

  const pathName = removeLeadingSlashes(initial.path)

  const payload = {
    ...initial,
    path: pathName,
    fileName: pathType === 'blob' ? pathName : undefined,
  }

  const { pullNumber, path, provider, mergeCommitSha } = payload

  const pullPath = pullNumber ? `/${pullNumber}` : ''

  const relative = path ? `/${path}` : ''
  const innerPath = pathType ? `/${pathType}` : ''

  const queries = buildQuery(payload) || ''

  const repoPath = getRepoPath(payload)

  const providerPath = `/${provider}`

  const query = mergeCommitSha ? `?${buildQuery({ mergeCommitSha })}` : ''

  return {
    as: `${providerPath}${repoPath}${pullPath}${innerPath}${relative}${query}`,
    href: `/repositories/${pathType === 'blob' ? 'file' : 'item'}?${queries}`,
  }
}

export const buildApiUrl = (initial?: buildRepositoryUrlPayloadType) => (
  pathType?: urlPathType,
) => {
  const { as, href } = buildRepositoryUrl(initial)(pathType)

  return (as || href).replace('/github/', '/api/repositories/')
}

export const buildProviderUrl = (initial?: buildProviderUrlPayloadType) => (
  pathType?: providerUrlPathType,
) => {
  if (!initial) return
  const { commitNumber, provider, owner } = initial
  if (provider !== 'github') return

  const baseUrl = getProviderBaseUrl(provider)

  if (pathType === 'profile') {
    return `${baseUrl}/${owner}`
  }

  const repoPath = getProviderRepoPath(provider)(initial)

  if (pathType === 'repository') {
    return `${baseUrl}${repoPath}`
  }

  const innerPath = initial.path ? `/${initial.path}` : ''

  const path = `${repoPath}/${pathType}/${commitNumber}${innerPath}`

  return `${baseUrl}${path}`
}

export const buildProviderPullRequestUrl = (initial?: {
  pullNumber: string
  owner: string
  repo: string
  path?: string
}) => (provider: integrationProviderType) => {
  if (!initial) {
    return
  }

  const { pullNumber } = initial
  const innerPath = initial.path ? `/${initial.path}` : ''

  if (provider !== 'github') return

  const repoPath = getProviderRepoPath(provider)(initial)
  const path = `${repoPath}/pull/${pullNumber}${innerPath}`

  return `${getProviderBaseUrl(provider)}${path}`
}
