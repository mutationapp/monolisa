import * as React from 'react'
import useAppContext from '../../hooks/useAppContext'
import Link from 'next/link'

import { useLoading, useProfile } from '../../hooks'
import { Fragment } from 'react'
import { UnlockIcon, LockIcon, BookmarkIcon } from '../../components/icons'
import { DashboardLayout } from '../../components/layouts'
import { UserInfoHeading } from '../../components/dashboard/heading'
import { isLoading } from '../../hooks/fetcher'
import { run, dealWithIt, nothingHereYet } from 'monolisa.lib'
import Error from '../_error'
import listingsMock from '../../mock/listings'
import { formatRelative, subDays } from 'date-fns'

export type companyType = {
  slug: string
  picture: string
}

export type listingType = {
  id: string
  company: companyType
  content: string
  createdDate: Date
}

import {
  Box,
  SomethingWentWrong,
  Loading,
  Flex,
  Spinner,
  Installation,
  Markdown,
} from '../../components'
import { LoginNotification } from '../../components/notifications'
import { css, t } from '../../styles/typography'

const Repositories = () => {
  const { user, member } = useAppContext()
  const [listings] = React.useState<listingType[]>(listingsMock)

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
                    <h3>Job Board</h3>
                  </Flex>
                  <p>Imported organizations jobs.</p>
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
                      <Link href="/jobs/import">
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

        return (
          <ul
            className={css({
              display: 'flex',
              flexDirection: 'column',
              margin: '-25px 0',
              gap: '15px',
            })}
          >
            {listings.map(job => {
              const { company: user } = job
              return (
                <Box shadow key={job.id}>
                  <div
                    className={css({
                      position: 'relative',
                      top: '-10px',
                      left: '-10px',
                    })}
                  >
                    {/* <CompanyProfile {...{ listing: tweet }} /> */}
                  </div>
                  <section>
                    <header
                      className={css({
                        color: 'var(--shade-7)',
                        fontSize: '0.825rem',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-header-medium)',
                      })}
                    >
                      @{user.slug}{' '}
                      <Link {...{ href: `/jobs/${job.id}` }}>
                        <a>
                          {formatRelative(
                            subDays(job.createdDate, 3),
                            new Date(),
                          )}
                        </a>
                      </Link>
                    </header>
                    <div style={t.content} className="tweet-details-content">
                      <Markdown>{job.content}</Markdown>
                    </div>
                    <ul className={css({ display: 'flex', gap: '10px' })}>
                      <li>
                        <a
                          className={css({
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          })}
                        >
                          <BookmarkIcon
                            className={css({
                              marginRight: 5,
                            })}
                          />{' '}
                          14
                        </a>
                      </li>
                    </ul>
                  </section>
                </Box>
              )
            })}
          </ul>
        )
      })}
    </DashboardLayout>
  )
}

export default Repositories
