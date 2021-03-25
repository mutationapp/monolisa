import { useRouter } from 'next/router'
import { removeLeadingSlashes, removeQuery } from 'monolisa.lib/utils/url'
import { getReportPathTitle } from '../../server/shared/buildRepositoryUrl'
import { capitalizeFirstLetter } from 'monolisa.lib/utils/string'

export type useRepositoryPageTitleType = () => string | undefined

const useRepositoryPageTitle: useRepositoryPageTitleType = () => {
  const { asPath } = useRouter()

  const name = getReportPathTitle(asPath)
  if (!name) {
    return
  }

  return `${capitalizeFirstLetter(name)} : ${removeLeadingSlashes(
    removeQuery(asPath),
  )}`
}

export default useRepositoryPageTitle
