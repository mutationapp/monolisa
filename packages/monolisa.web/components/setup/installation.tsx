import Link from 'next/link'

import { Box } from '..'
import { blank } from '../link'
import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from 'monolisa.lib/utils/string'
import { Fragment } from 'react'
import Image from 'next/image'

import getSetupUrl from './shared/getSetupUrl'
import styles from './styles'

import { getSection, getSectionIcon, getSkip } from './shared'
import { run } from 'monolisa.lib'

function Installation() {
  const { asPath, pathname } = useRouter()
  const buildSetupUrl = getSetupUrl(pathname)

  const section = getSection(asPath)
  const skip = getSkip(asPath)

  const subSection: 'user' | 'team' | undefined =
    skip === 2 ? 'team' : skip === 1 ? 'user' : undefined

  return (
    <Box
      shadow
      header={{
        children: capitalizeFirstLetter(section),
        icon: getSectionIcon(section),
      }}
      footer={run(() => {
        if (subSection === 'user') {
          return (
            <Link {...buildSetupUrl('import', 0)}>
              <a>go next (import)</a>
            </Link>
          )
        }

        if (subSection === 'team') {
          return (
            <Link {...buildSetupUrl('import', 0)}>
              <a>go next (import)</a>
            </Link>
          )
        }

        return (
          <Link {...buildSetupUrl('installation', 1)}>
            <a>go next (authorization)</a>
          </Link>
        )
      })}
    >
      <section>
        <style jsx>{styles}</style>
        {run(() => {
          const choose = (type: 'user' | 'organization') => {
            return (
              <div>
                If you choose <strong>your github {type}</strong> to install,
                you will be asked for granting access to <strong>public</strong>{' '}
                or/and <strong>private</strong> repositories.
                <div>
                  Else continue from{' '}
                  <Link
                    {...buildSetupUrl('installation', type === 'user' ? 2 : 1)}
                  >
                    <a>here</a>
                  </Link>{' '}
                  if you choose{' '}
                  <strong>{type === 'user' ? 'organization' : 'user'}</strong>{' '}
                  installation in{' '}
                  <Link {...buildSetupUrl('installation', 0)}>
                    <a>installation</a>
                  </Link>{' '}
                  step.
                </div>
              </div>
            )
          }

          if (subSection === 'user') {
            return (
              <Fragment>
                {choose('user')}
                <div>
                  <figure>
                    <Image
                      width={725}
                      height={1261}
                      layout={'responsive'}
                      src="/static/setup/user-authorize.webp"
                      alt="user authorizing"
                      key="user authorizing"
                    />
                  </figure>
                </div>
                <div>
                  After authorization you will be redirected to monolisa.app, an
                  account going to be created.
                </div>
              </Fragment>
            )
          }

          if (subSection === 'team') {
            return (
              <Fragment>
                {choose('organization')}
                <figure>
                  <Image
                    width={725}
                    height={1346}
                    layout={'responsive'}
                    src="/static/setup/team-authorize.webp"
                    alt="team authorizing"
                    key="team authorizing"
                  />
                </figure>
                <div>
                  After authorization you will be redirected to{' '}
                  <strong>monolisa.app</strong>. Based on your{' '}
                  <strong>organization</strong> a <strong>team</strong> will be
                  created with a new account.
                </div>
              </Fragment>
            )
          }

          return (
            <Fragment>
              <div>
                When you ask for a{' '}
                <a
                  {...blank}
                  href="https://github.com/apps/monolisaapp/installations/new"
                >
                  installation
                </a>{' '}
                for monolisa.app to <strong>github</strong>, depending on your
                profile, you will see something similar to following{' '}
              </div>
              <div>
                <figure>
                  <Image
                    width={725}
                    height={460}
                    layout={'responsive'}
                    src="/static/setup/installation.webp"
                    alt="installation"
                    key="installation"
                  />
                </figure>
              </div>
            </Fragment>
          )
        })}
      </section>
    </Box>
  )
}

export default Installation
