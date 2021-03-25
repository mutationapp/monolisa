import { buildQuery } from 'monolisa.lib/utils/url'
import { sectionType } from '..'

const getSetupUrl = (pathName: string) => (
  section?: sectionType,
  skip?: number,
) => {
  const href = section
    ? `${pathName}?${buildQuery({ section, skip })}`
    : pathName

  return {
    as: href,
    href,
  }
}

export default getSetupUrl
