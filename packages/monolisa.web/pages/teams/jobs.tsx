import * as React from 'react'
import Link from 'next/link'

import { useLoading, useTeam, useAppContext } from '../../hooks'
import { DashboardLayout } from '../../components/layouts'
import { isLoading } from '../../hooks/fetcher'
import { run, nothingHereYet, dealWithIt } from 'monolisa.lib'
import {
  Box,
  SomethingWentWrong,
  Loading,
  Flex,
  Installation,
} from '../../components'
import { useRouter } from 'next/router'
import { TeamInfoHeading } from '../../components/dashboard/heading'
import { Fragment, useEffect } from 'react'
import { parseQuery } from 'monolisa.lib/utils/url'
import { getTeamUrl } from '../../server/shared'
import { LockIcon, UnlockIcon } from '../../components/icons'
import { isOwner } from 'monolisa.model'

const Repositories = () => {
  const router = useRouter()
  const { team } = useAppContext()
  if (!team) {
    return null
  }
  const { name: teamSlug, teamMember } = team
  const { invitationKey } = parseQuery(router.asPath)

  useEffect(() => {
    invitationKey &&
      setTimeout(() => {
        const { as, href } = getTeamUrl(teamSlug)('profile')
        router.replace(as || href, as)
      }, 1000)
  }, [invitationKey])

  const teamProfile = useTeam(teamSlug)

  const { data, error } = teamProfile

  const { repositories, installations } = data || {}

  const loading = useLoading(isLoading(teamProfile))

  return (
    <DashboardLayout
      pageTitle={`${teamSlug} : Repositories`}
      pull
      aside={
        <section className="aside">
          {run(() => {
            if (!installations?.length || !repositories?.length) {
              return
            }

            if (!teamMember) {
              return (
                <Fragment>
                  <Flex icon={<UnlockIcon />}>
                    <h3>Public repositories</h3>
                  </Flex>
                  <p className="smaller">
                    Go to details to see monolisa reports.
                  </p>
                </Fragment>
              )
            }

            return (
              <Fragment>
                <Flex icon={<LockIcon />}>
                  <h3>Repositories</h3>
                </Flex>
                <p>
                  You can add new one from{' '}
                  <Link {...getTeamUrl(teamSlug)('import')}>
                    <a> here</a>
                  </Link>
                  .
                </p>
              </Fragment>
            )
          })}
        </section>
      }
      heading={<TeamInfoHeading />}
    >
      <style jsx>{`
        p {
          margin-top: 10px;
          font-size: 0.775rem;
          line-height: 1.5rem;
        }
      `}</style>
      {run(() => {
        if (invitationKey) {
          return <Box>{'🎉 Welcome to the team.'}</Box>
        }

        if (error) {
          return <SomethingWentWrong />
        }

        if (loading) {
          return <Loading box />
        }

        if (!installations?.length) {
          return <Installation />
        }

        if (!repositories?.length) {
          return (
            <Box
              footer={
                teamMember &&
                isOwner(teamMember) && (
                  <div>
                    💡 Start to{' '}
                    <Link {...getTeamUrl(teamSlug)('import')}>
                      <a>add</a>
                    </Link>{' '}
                    repositories.
                  </div>
                )
              }
            >
              {dealWithIt(nothingHereYet)}
            </Box>
          )
        }
      })}
    </DashboardLayout>
  )
}

export default Repositories
