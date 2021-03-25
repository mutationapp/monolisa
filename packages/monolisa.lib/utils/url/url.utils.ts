export const buildQuery = (payload?: object) =>
  typeof payload === 'object'
    ? Object.entries(payload).reduce(
        (acc, [key, value], index) =>
          value ? `${acc}${index ? '&' : ''}${key}=${value}` : acc,
        '',
      )
    : undefined

export const parseQuery = (url: string) => {
  const index = url.indexOf('?')

  if (index === -1) {
    return {}
  }

  const path = url.substring(index + 1, url.length)

  return Object.fromEntries(new URLSearchParams(path).entries()) || {}
}

export const appendQuery = (url: string, payload: object) => {
  const base = removeQuery(url)
  const query = parseQuery(url)

  return `${base}?${buildQuery({
    ...query,
    ...payload,
  })}`
}
export const removeTrailingSlashes = (path?: string) =>
  typeof path === 'string' ? path.replace(/\/+$/, '') : path

export const removeLeadingSlashes = (path?: string) =>
  typeof path === 'string' ? path.replace(/^\/+/, '') : path

export const addLeadingSlash = (path: string) =>
  '/' + removeLeadingSlashes(path)

export const removeQuery = (path?: string) =>
  path && path.includes('?') ? path.slice(0, path.indexOf('?')) : path

export const getParentPath = (path?: string) => {
  if (typeof path !== 'string') {
    return
  }

  const withoutTrailing = removeTrailingSlashes(path)
  if (!withoutTrailing) {
    return
  }

  const paths = withoutTrailing.split('/')
  return paths.slice(0, paths.length - 1).join('/')
}

export const getParentPathUntil = (path: string, until: string) => {
  let current = path

  do {
    const parent = getParentPath(current)
    if (!parent) {
      break
    }

    current = parent
  } while (!current.endsWith(`/${until}`))

  return current
}

export const getDomain = (url?: URL | string) => {
  if (!url) {
    return
  }

  const parsed = typeof url === 'string' ? new URL(url) : url

  return parsed.hostname.split('.').slice(-2).join('.')
}
