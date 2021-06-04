import { DashboardLayout } from '../../components/layouts'
import withTeamAuth from '../../components/auth/withTeamAuth'
import {
  TeamInvitation,
  Navigation,
  TeamDangerZone,
  TeamMembers,
} from '../../components'
import { useRouter } from 'next/router'
import { run } from 'monolisa.lib'
import { AddUserIcon, AlertIcon, UsersIcon } from '../../components/icons'
import { parseQuery } from 'monolisa.lib/utils/url'
import { getTeamUrl } from '../../server/shared'
import { useAppContext } from '../../hooks'

const Settings = () => {
  const router = useRouter()

  const { team } = useAppContext()

  if (!team) {
    return null
  }

  const { section } = parseQuery(router.asPath)
  const teamSlug = team.name

  return (
    <DashboardLayout
      pageTitle={`${teamSlug} : Settings`}
      pull
      title="Team settings"
      aside={
        <Navigation
          icon
          items={[
            {
              name: 'Team members',
              ...getTeamUrl(teamSlug)('settings'),
              icon: <UsersIcon />,
            },
            {
              name: 'Add member',
              ...getTeamUrl(teamSlug)('invite'),
              icon: <AddUserIcon />,
            },
            {
              name: 'Delete team',
              ...getTeamUrl(teamSlug)('danger'),
              icon: <AlertIcon />,
            },
          ]}
        />
      }
    >
      {run(() => {
        if (section === 'danger') {
          return <TeamDangerZone />
        }

        if (section === 'invite') {
          return <TeamInvitation />
        }

        return <TeamMembers />
      })}
    </DashboardLayout>
  )
}

export default withTeamAuth(Settings)
