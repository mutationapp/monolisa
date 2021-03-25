import useRepositoryRoute from '../../hooks/useRepositoryRoute'
import RouteTabs from '.'
import { PullRequestIcon, GearIcon, CodeIcon } from '../icons'
import { useAppContext } from '../../hooks'

const RepositoryRouteTabs: React.FunctionComponent = () => {
  const repositoryRoute = useRepositoryRoute()

  const { member, repository } = useAppContext()

  if (!repositoryRoute || !repository) {
    return null
  }

  const { overview, settings, pulls } = repositoryRoute

  return (
    <RouteTabs
      className="tabs"
      tabs={[
        {
          icon: <CodeIcon />,
          children: 'Overview',
          value: 'overview',
          ...overview,
        },
        {
          icon: <PullRequestIcon />,
          children: 'Pull Requests',
          value: 'pulls',
          ...pulls,
        },
        {
          icon: <GearIcon />,
          children: 'Settings',
          value: 'settings',
          ...settings,
        },
      ].filter(t => member || t.value !== 'settings')}
    />
  )
}

export default RepositoryRouteTabs
