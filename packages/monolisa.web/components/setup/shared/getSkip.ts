import { parseQuery } from 'monolisa.lib/utils/url'

const getSkip = (path: string) => {
  const { skip } = parseQuery(path)

  return skip ? parseInt(skip) : 0
}

export default getSkip
