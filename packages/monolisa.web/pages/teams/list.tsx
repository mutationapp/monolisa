import classNames from 'classnames'

import { run } from 'monolisa.lib'
import { getTeamUrl, teamsPayloadType } from '../../server/shared'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { DashboardLayout } from '../../components/layouts'
import { GridIcon } from '../../components/icons'

import {
  Box,
  Loading,
  Button,
  TeamNavigation,
  SomethingWentWrong,
  Spinner,
} from '../../components'

import {
  useTeams,
  useLoading,
  useAppContext,
  useReducerState,
} from '../../hooks'
import getUrl from '../../server/shared/getUrl'
import { LoginNotification } from '../../components/notifications'

const Teams = () => {
  const router = useRouter()
  const { user, member } = useAppContext()

  const {
    state: { navigating },
    setState,
  } = useReducerState<{
    navigating?: string
  }>()

  useEffect(() => {
    navigating &&
      setTimeout(() => {
        router.push(navigating)
      }, 0)
  }, [navigating])

  const examples = {
    teams: [
      {
        teamSlug: 'monolisaapp',
      },
    ],
  }

  const { data, error } = member
    ? useTeams()
    : {
        data: examples as teamsPayloadType,
        error: undefined,
      }
  const loading = useLoading(!error && !data)

  const teams = data?.teams

  return (
    <DashboardLayout
      pageTitle={member ? `${user?.slug} : Teams` : 'Teams'}
      title={member ? 'Managed companies' : 'Public teams'}
      subtitle={
        user && !member
          ? 'User teams are private, here are some public teams from monolisa.app'
          : ''
      }
      pull
      aside={member ? <TeamNavigation /> : ' '}
    >
      <style jsx>{`
        .teams:not(.empty) {
        }
        .team {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--shade-2);
        }
        .team:last-child {
          border-bottom: 0;
        }
        .team .name {
          flex: 1;
        }
      `}</style>
      {run(() => {
        if (error) {
          return <SomethingWentWrong />
        }

        if (loading) {
          return <Loading box />
        }

        return (
          <Box
            shadow
            push
            header={{
              children: 'Teams',
              icon: <GridIcon />,
              button: {
                size: 'small',
                secondary: true,
                disabled: !!navigating,
                link: member
                  ? getUrl(member.slug)('teams/new')
                  : {
                      href: 'teams/new',
                    },
                children: 'Create team',
              },
            }}
            footer={run(() => {
              if (!member) {
                return <LoginNotification section="teams" />
              }
              return `${
                teams?.length
                  ? `${teams.length} teams listed.`
                  : 'Nothing here yet.'
              } Go through navigation to create team.`
            })}
          >
            <section
              className={classNames('teams', {
                empty: !teams?.length,
              })}
            >
              {run(() => {
                if (!teams?.length) {
                  return 'n/a'
                }

                return teams.map(team => {
                  const { teamSlug } = team

                  const { as } = getTeamUrl(teamSlug)('repositories')

                  return (
                    <div key={teamSlug} className="team">
                      <span className="name">{teamSlug}</span>
                      <Button
                        icon={navigating === as ? <Spinner /> : undefined}
                        onClick={() => {
                          setState({ navigating: as })
                        }}
                        size="small"
                      >
                        {'Company Profile'}
                      </Button>
                    </div>
                  )
                })
              })}
            </section>
          </Box>
        )
      })}
    </DashboardLayout>
  )
}

export default Teams
