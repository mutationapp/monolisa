import * as React from 'react'
import useAppContext from '../../hooks/useAppContext'
import Link from 'next/link'

import { useLoading, useProfile } from '../../hooks'
import { Fragment } from 'react'
import { UnlockIcon, LockIcon } from '../../components/icons'
import { DashboardLayout } from '../../components/layouts'
import { UserInfoHeading } from '../../components/dashboard/heading'
import { isLoading } from '../../hooks/fetcher'
import { run, dealWithIt, nothingHereYet } from 'monolisa.lib'
import Error from '../_error'

import {
  Box,
  SomethingWentWrong,
  Loading,
  Flex,
  Spinner,
  Installation,
} from '../../components'
import { LoginNotification } from '../../components/notifications'

const Repositories = () => {
  const { user, member } = useAppContext()
  if (!user) {
    return <Error statusCode={401} />
  }

  const profile = useProfile(user.slug)

  const { data, error } = profile
  const { repositories, installations } = data || {}

  const loading = useLoading(isLoading(profile))

  return (
    <DashboardLayout
      pageTitle={`${user.slug} : Repositories`}
      pull
      aside={
        repositories?.length ? (
          <section className="aside">
            <style jsx>{`
              p {
                font-size: 0.875rem;
                line-height: 1.5rem;
              }
            `}</style>
            {run(() => {
              if (loading) {
                return <Spinner />
              }

              if (!installations?.length) {
                return
              }

              if (!member) {
                return (
                  <Fragment>
                    <Flex icon={<UnlockIcon />}>
                      <h3>Public repositories</h3>
                    </Flex>
                    <p>
                      You can login from{' '}
                      <Link href="/login">
                        <a>here</a>
                      </Link>
                      .
                    </p>
                  </Fragment>
                )
              }

              return (
                <Fragment>
                  <Flex icon={<LockIcon />}>
                    <h3>Repositories</h3>
                  </Flex>
                  <p>You can always import a new one.</p>
                </Fragment>
              )
            })}
          </section>
        ) : (
          ' '
        )
      }
      heading={<UserInfoHeading installations={installations} />}
    >
      {run(() => {
        if (error) {
          return <SomethingWentWrong />
        }

        if (!data) {
          return <Loading box />
        }

        const { repositories, installations } = data

        if (!installations?.length) {
          return <Installation />
        }

        if (!repositories?.length) {
          return (
            <Box
              footer={run(() => {
                if (!member) {
                  return <LoginNotification section="repositories" />
                }

                return (
                  user.id === member?.id && (
                    <div>
                      💡 Start to{' '}
                      <Link href="/repositories/import">
                        <a>add</a>
                      </Link>{' '}
                      repositories.
                    </div>
                  )
                )
              })}
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
