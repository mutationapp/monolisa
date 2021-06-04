import { DashboardLayout } from '../../components/layouts'
import { TeamNavigation, Button, FieldSet, Box } from '../../components'

import { getTeamUrl } from '../../server/shared'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { Fragment } from 'react'
import { useFeatureToggleContext, useAppContext } from '../../hooks'
import { run } from 'monolisa.lib'

import {
  getIntegrationProviderIcon,
  BoxIcon,
  DividerIcon,
} from '../../components/icons'

const NewTeam = () => {
  const { member } = useAppContext()
  const { isFeature } = useFeatureToggleContext()
  const router = useRouter()

  const handleSuccess = async ({ value: teamSlug }) => {
    const { as } = getTeamUrl(teamSlug)('repositories')
    router.push(as, as)
  }

  const provider = 'github'

  const canCreateSlug = member && isFeature({ FT_TEAM_SLUG_CREATION: 'on' })

  return (
    <DashboardLayout
      pull
      pageTitle="Create team"
      title="Create team"
      back={{ area: 'teams', href: '/teams' }}
      aside={<TeamNavigation />}
    >
      <style jsx>{`
        .install,
        .path {
          display: flex;
          align-items: center;
        }

        .install.hasSlug {
          margin-bottom: 30px;
        }

        .path {
          font-size: 0.875rem;
          margin-right: 3px;
        }

        span.teams {
          margin-bottom: 4px;
        }
      `}</style>

      {run(() => {
        const renderInstall = () => (
          <section
            className={classNames('install', {
              hasSlug: canCreateSlug,
            })}
          >
            <span className="path">
              <BoxIcon size="24" />
              <DividerIcon /> <span className="teams">teams</span>
              <DividerIcon />
            </span>
            <div className="content">
              <a href={`/installations/${provider}`}>
                <Button
                  className="provider"
                  key={provider}
                  icon={getIntegrationProviderIcon(provider)}
                >
                  Install using {provider}
                </Button>
              </a>
            </div>
          </section>
        )

        if (!canCreateSlug) {
          return (
            <Box shadow footer="💡 You will be redirected to github.">
              {renderInstall()}
            </Box>
          )
        }

        return (
          <FieldSet
            shadow
            onSuccess={handleSuccess}
            focus
            name="slug"
            title="New team"
            description={
              <Fragment>
                {renderInstall()}
                Or enter your team slug
              </Fragment>
            }
            placeHolder="Please use 32 characters at maximum."
            url="/api/teams"
            method="POST"
            validation={{
              required: true,
              isSlug: true,
              maxLength: 32,
              minLength: 3,
            }}
          />
        )
      })}
    </DashboardLayout>
  )
}

export default NewTeam
