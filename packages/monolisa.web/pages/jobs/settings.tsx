import { DashboardLayout } from '../../components/layouts'
import {
  useRepositoryRoute,
  useAppContext,
  useRepositoryPageTitle,
} from '../../hooks'
import {
  withAuth,
  Navigation,
  RepositoryDangerZone,
  RepositoryToken,
  Redirect,
} from '../../components'
import { AlertIcon, GearIcon } from '../../components/icons'
import { appendQuery, parseQuery } from 'monolisa.lib/utils/url/url.utils'
import { useRouter } from 'next/router'
import { run } from 'monolisa.lib'
import { isOwner } from 'monolisa.model'
import { buildRepositoryUrl } from '../../server/shared'
import { useRepositoryRouteResponseType } from '../../hooks/useRepositoryRoute'

const RepositorySettings = () => {
  const { asPath } = useRouter()

  const { section } = parseQuery(asPath)

  const repositoryRoute = useRepositoryRoute() as useRepositoryRouteResponseType

  const { query } = repositoryRoute
  const { repo, owner, provider } = query

  const { team } = useAppContext()

  const teamMember = team?.teamMember

  const canDelete = !teamMember || isOwner(teamMember)

  if (!canDelete && section === 'danger') {
    return <Redirect {...buildRepositoryUrl({ repo, owner, provider })()} />
  }

  const { overview, settings } = repositoryRoute

  return (
    <DashboardLayout
      pageTitle={useRepositoryPageTitle()}
      pull
      title={'Repository Settings'}
      back={{ area: 'overview', ...overview }}
      aside={
        <Navigation
          icon
          items={[
            {
              name: 'Settings',
              ...settings,
              icon: <GearIcon />,
            },
            {
              name: 'Delete repository',
              ...settings,
              as: appendQuery(settings.as || settings.href, {
                section: 'danger',
              }),
              icon: <AlertIcon />,
            },
          ].filter(i => !['Delete repository'].includes(i.name) || canDelete)}
        />
      }
    >
      {run(() => {
        if (section === 'danger') {
          return <RepositoryDangerZone />
        }

        return <RepositoryToken />
      })}
    </DashboardLayout>
  )
}

export default withAuth(RepositorySettings)
