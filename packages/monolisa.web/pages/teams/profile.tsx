import { MainLayout } from '../../components/layouts'
import withTeamAuth from '../../components/auth/withTeamAuth'
import {
  Navigation,
  TeamDangerZone,
  Markdown,
  Installations,
} from '../../components'
import { useRouter } from 'next/router'
import { run } from 'monolisa.lib'
import { AlertIcon } from '../../components/icons'
import { parseQuery } from 'monolisa.lib/utils/url'
import { getTeamUrl } from '../../server/shared'
import { useAppContext } from '../../hooks'
import React from 'react'
import { company, lorem } from 'faker'
import dedent from 'dedent'
import { randomEmoji } from '../../mock/emoji'

const Settings = () => {
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
      title={company.companyName()}
      back={false}
      subtitle={company.catchPhrase()}
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

        return (
          <Markdown>
            {dedent`
          ${lorem.paragraph()}

          ${lorem.paragraph()}
          
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          
          ${lorem.paragraph()}
          ${lorem.paragraph()}
        `}
          </Markdown>
        )
      })}
    </MainLayout>
  )
}

export default withTeamAuth(Settings)
