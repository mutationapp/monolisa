import Link from 'next/link'
import React from 'react'
import styles from './styles'

import { useRouter } from 'next/router'
import { Box } from '..'
import { getSectionIcon, getSetupUrl } from './shared'

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
          <h2>Monolisa is automated job board for github organizations.</h2>
        </div>
        <div>
          monolisa.app&apos;s api supports <strong>public</strong> repositories
          from <strong>organizations</strong>, using github{' '}
          <Link {...buildSetupUrl('installation')}>
            <a>installations</a>
          </Link>
          .
        </div>
      </section>
    </Box>
  )
}

export default Introduction
