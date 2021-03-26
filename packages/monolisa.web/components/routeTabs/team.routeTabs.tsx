import RouteTabs from '.'
import { getTeamUrl } from '../../server/shared'
import { isOwner } from 'monolisa.model'
import { useAppContext } from '../../hooks'
import { BookIcon, GearIcon, InstallationIcon } from '../icons'

const TeamRouteTabs = () => {
  const { team } = useAppContext()

  const teamMember = team?.teamMember

  if (!team) {
    return null
  }

  const buildTeamUrl = getTeamUrl(team.name)

  return (
    <RouteTabs
      tabs={[
        {
          icon: <BookIcon />,
          children: 'Jobs',
          value: 'jobs',
          ...buildTeamUrl('repositories'),
        },
        {
          icon: <GearIcon />,
          children: 'Settings',
          value: 'settings',
          ...buildTeamUrl('settings'),
        },
        {
          icon: <InstallationIcon />,
          children: 'Installations',
          value: 'installations',
          ...buildTeamUrl('installations'),
        },
      ].filter(
        ({ value }) => !['settings'].includes(value) || isOwner(teamMember),
      )}
    />
  )
}

export default TeamRouteTabs
