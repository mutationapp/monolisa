import Link from 'next/link'
import React from 'react'
import styles from './styles'

import { useRouter } from 'next/router'
import { Box } from '..'
import { getSectionIcon, getSetupUrl } from './shared'
import { blank } from '../link'

const Contact = () => {
  const { pathname } = useRouter()
  const buildSetupUrl = getSetupUrl(pathname)

  return (
    <Box
      shadow
      header={{
        children: 'Contact',
        icon: getSectionIcon('contact'),
      }}
      footer={
        <Link {...buildSetupUrl('introduction')}>
          <a>go to start (introduction)</a>
        </Link>
      }
    >
      <style jsx>{styles}</style>
      <section>
        <div className="small">
          Feel free to{' '}
          <a {...blank} href="https://twitter.com/monolisaapp">
            contact from here
          </a>{' '}
          for any question. You can also report an issue on github from{' '}
          <a href="https://github.com/monolisaapp/mutate/issues" {...blank}>
            {'here'}
          </a>
        </div>
      </section>
    </Box>
  )
}

export default Contact
