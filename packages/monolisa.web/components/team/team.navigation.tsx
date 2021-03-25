import { Navigation } from '..'
import { BoxIcon, GridIcon } from '../icons'
import getUrl from '../../server/shared/getUrl'
import { useAppContext } from '../../hooks'

const TeamNavigation = () => {
  const { member } = useAppContext()

  if (!member) return null

  const buildUrl = getUrl(member.slug)

  return (
    <Navigation
      icon
      items={[
        {
          name: 'Your teams',
          ...buildUrl('teams'),
          icon: <GridIcon />,
        },
        {
          name: 'Create team',
          ...buildUrl('teams/new'),
          icon: <BoxIcon />,
        },
      ]}
    />
  )
}

export default TeamNavigation
