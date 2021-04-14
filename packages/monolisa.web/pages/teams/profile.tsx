import React from 'react'

import { useRouter } from 'next/router'
import { run } from 'monolisa.lib'
import { AlertIcon } from '../../components/icons'
import { parseQuery } from 'monolisa.lib/utils/url'
import { getTeamUrl } from '../../server/shared'
import { useAppContext } from '../../hooks'
import { MainLayout } from '../../components/layouts'

import {
  Navigation,
  TeamDangerZone,
  Markdown,
  Installations,
} from '../../components'

const TeamProfile = () => {
  const router = useRouter()

  const { team } = useAppContext()

  if (!team) {
    return null
  }

  const { section } = parseQuery(router.asPath)
  const teamSlug = team.name

  return (
    <MainLayout
      pageTitle={`${teamSlug} : Settings`}
      title={team.title}
      subtitle={team.subtitle}
      aside={
        <Navigation
          icon
          items={[
            {
              name: 'Installations',
              ...getTeamUrl(teamSlug)('installations'),
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

        if (section === 'installations') {
          return <Installations />
        }

        return <Markdown>{team.profile || 'N/A'}</Markdown>
      })}
    </MainLayout>
  )
}

export default TeamProfile
