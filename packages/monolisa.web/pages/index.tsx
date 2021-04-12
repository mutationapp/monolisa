import { Box, Button, Markdown } from '../components'
import React from 'react'
import { css, t } from '../styles/typography'
import Link from 'next/link'
import { MainLayout } from '../components/layouts'
import { useJobs } from '../hooks'
import { run } from 'monolisa.lib'

function HomePage() {
  const { data } = useJobs()

  return (
    <MainLayout
      title={'Automated job board for github organizations'}
      pull
      back={false}
      subtitle={'F# 🍒, TypeScript ✨, Javascript 🍉, ELM 🍐, HASKELL 🌊'}
    >
      {run(() => {
        if (!data) return 'Loading'

        const { jobs } = data
        const { teams } = data

        return (
          <ul
            className={css({
              display: 'flex',
              flexDirection: 'column',
              margin: '-25px 0',
              gap: '15px',
            })}
          >
            {jobs.map((job, index) => {
              const team = teams[index]

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
                        <Link {...{ href: `/teams/${team.slug}` }}>
                          <a
                            className={css({
                              marginLeft: 2,
                            })}
                          >
                            {team.slug}
                          </a>
                        </Link>
                        , 23.10.1984
                      </div>
                      <Button link={{ ...{ href: `/jobs/${job.id}` } }}>
                        View
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
                      <Markdown>{job.summary}</Markdown>
                    </div>
                  </section>
                </Box>
              )
            })}
          </ul>
        )
      })}
    </MainLayout>
  )
}

export default HomePage
