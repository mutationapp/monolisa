import { parseQuery } from 'monolisa.lib/utils/url'
import { sectionType } from '..'

const getSection = (path: string) => {
  const query = parseQuery(path)

  return (query.section as sectionType) || 'introduction'
}

export default getSection
