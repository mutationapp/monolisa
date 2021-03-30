import { Box, Button, Markdown } from '../components'
import React from 'react'
import { listingType } from './jobs/list'
import listingsMock from '../mock/listings'
import { css, t } from '../styles/typography'
import Link from 'next/link'
import { MainLayout } from '../components/layouts'

function HomePage() {
  const [jobs] = React.useState<listingType[]>(listingsMock)

  return (
    <MainLayout
      title={'Automated job board for github organizations'}
      pull
      aside={' '}
      back={false}
      subtitle={'F#, Javascript, TypeScript, ELM, HASKELL'}
    >
      <ul
        className={css({
          display: 'flex',
          flexDirection: 'column',
          margin: '-25px 0',
          gap: '15px',
        })}
      >
        {jobs.map(job => {
          const { company } = job

          return (
            <Box
              shadow
              key={job.id}
              footer={
                <div
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  })}
                >
                  <div className={css({ flex: 1 })}>
                    @
                    <Link {...{ href: `/teams/mutationapp` }}>
                      <a
                        className={css({
                          marginLeft: 2,
                        })}
                      >
                        {company.slug}
                      </a>
                    </Link>
                    , 23.10.1984
                  </div>
                  <Button link={{ ...{ href: `/jobs/${job.id}` } }}>
                    Job Details
                  </Button>
                </div>
              }
            >
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
                <div style={t.content} className="tweet-details-content">
                  <Markdown>{job.content}</Markdown>
                </div>
              </section>
            </Box>
          )
        })}
      </ul>
    </MainLayout>
  )
}

export default HomePage
