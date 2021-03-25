import Link from 'next/link'

import { Box } from '..'
import { useRouter } from 'next/router'
import styles from './styles'

import getSetupUrl from './shared/getSetupUrl'
import Image from 'next/image'

import { getSection, getSectionIcon } from './shared'

function Installation() {
  const { asPath, pathname } = useRouter()
  const buildSetupUrl = getSetupUrl(pathname)

  const section = getSection(asPath)

  return (
    <Box
      shadow
      header={{
        children: 'Integration',
        icon: getSectionIcon(section),
      }}
      footer={
        <Link {...buildSetupUrl('integration', 0)}>
          <a>go next (integration)</a>
        </Link>
      }
    >
      <style jsx>{styles}</style>
      <section>
        <div>
          When you authorized <strong>monolisa.app</strong> you can start
          importing your <strong>repositories</strong> from your{' '}
          <strong>github</strong> user or organization.
        </div>
        <figure>
          <Image
            width={725}
            height={422}
            src="/static/setup/import.webp"
            alt="import"
            key="import"
          />
        </figure>
        <div>
          When you get <strong>repository token</strong>, an{' '}
          <strong>unique key</strong> will be delivered for your repository.
        </div>
        <figure>
          <Image
            width={725}
            height={366}
            src="/static/setup/token.webp"
            alt="token"
            key="repository token"
          />
        </figure>
        <div>
          You can use your <strong>repository token</strong> to integrate{' '}
          <strong>monolisa.app</strong> using{' '}
          <strong>continuos integration</strong>.
        </div>
      </section>
    </Box>
  )
}

export default Installation
