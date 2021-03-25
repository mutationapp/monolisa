import Link from 'next/link'
import React from 'react'
import styles from './styles'

import { useRouter } from 'next/router'
import { Box } from '..'
import { blank } from '../link'
import { getSectionIcon, getSetupUrl } from './shared'
import { defaultTeamSize } from 'monolisa.model'

const Introduction = () => {
  const { pathname } = useRouter()
  const buildSetupUrl = getSetupUrl(pathname)

  return (
    <Box
      shadow
      header={{
        children: 'Introduction',
        icon: getSectionIcon('introduction'),
      }}
      footer={
        <Link {...buildSetupUrl('privacy')}>
          <a>go next (privacy)</a>
        </Link>
      }
    >
      <style jsx>{styles}</style>
      <section>
        <div>
          <h3>
            monolisa.app is a testing automation{' '}
            <a {...blank} href="https://github.com/monolisaapp">
              suite
            </a>{' '}
            for github projects
          </h3>
        </div>
        <div>
          monolisa.app uploads{' '}
          <a {...blank} href="https://stryker-mutator.io">
            stryker
          </a>{' '}
          monolisa testing reports, saves as <strong>historical data</strong> to
          provide <strong>pull request</strong> based comparisons.
        </div>
        <div>
          monolisa.app&apos;s api supports <strong>public/private</strong>{' '}
          repositories, <strong>teams/organizations</strong>, using github{' '}
          <Link {...buildSetupUrl('installation')}>
            <a>installations</a>
          </Link>
          .
        </div>
        <div>
          β: App is <strong>free</strong> for <strong>individuals</strong> and{' '}
          <strong>free</strong> up to <strong>{defaultTeamSize}</strong> seats
          for <strong>teams</strong> 🙌.{' '}
        </div>
      </section>
    </Box>
  )
}

export default Introduction
