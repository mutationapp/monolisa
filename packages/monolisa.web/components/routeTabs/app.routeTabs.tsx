import RouteTabs from '.'
import { UserIcon, BookIcon, InstallationIcon, GridIcon } from '../icons'
import { useAppContext } from '../../hooks'
import getUrl from '../../server/shared/getUrl'

const AppRouteTabs = () => {
  const { member, user } = useAppContext()

  const buildUrl = (() => {
    if (user) return getUrl(user.slug)
    if (member) return getUrl(member.slug)
  })()

  if (!buildUrl) {
    return null
  }

  if (user && user?.id !== member?.id) {
    return (
      <RouteTabs
        className="tabs"
        tabs={[
          {
            icon: <BookIcon />,
            children: 'Repositories',
            value: 'repositories',
            ...buildUrl('repositories'),
          },
          {
            icon: <InstallationIcon />,
            children: 'Installations',
            value: 'installations',
            ...buildUrl('installations'),
          },
          {
            icon: <GridIcon />,
            children: 'Companies',
            value: 'companies',
            ...buildUrl('teams'),
          },
        ]}
      />
    )
  }

  return member ? (
    <RouteTabs
      className="tabs"
      tabs={[
        {
          icon: <BookIcon />,
          children: 'Job Board',
          value: 'jobBoard',
          ...buildUrl('repositories'),
        },
        {
          icon: <GridIcon />,
          children: 'Companies',
          value: 'companies',
          ...buildUrl('teams'),
        },
        {
          icon: <InstallationIcon />,
          children: 'Installations',
          value: 'installations',
          ...buildUrl('installations'),
        },
        {
          icon: <UserIcon />,
          children: 'Account',
          value: 'account',
          ...buildUrl('account'),
        },
      ]}
    />
  ) : null
}

export default AppRouteTabs
