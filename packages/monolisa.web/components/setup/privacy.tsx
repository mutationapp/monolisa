import Link from 'next/link'
import styles from './styles'

import { useRouter } from 'next/router'
import { Box } from '..'

import { getSetupUrl, getSectionIcon } from './shared'
import { blank } from '../link'

const Privacy = () => {
  const { pathname } = useRouter()
  const buildSetupUrl = getSetupUrl(pathname)

  return (
    <Box
      shadow
      header={{
        children: 'Privacy',
        icon: getSectionIcon('privacy'),
      }}
      footer={
        <Link {...buildSetupUrl('installation')}>
          <a>go next (installation)</a>
        </Link>
      }
    >
      <style jsx>{styles}</style>
      <section>
        <div>
          When user make an{' '}
          <a
            {...blank}
            href="https://github.com/apps/monolisaapp/installations/new"
          >
            installation
          </a>
          , a profile will be linked to the installation provided by{' '}
          <strong>github</strong>
        </div>
        <div>
          When user{' '}
          <Link href="/login">
            <a>login</a>
          </Link>
          , an <strong>access token</strong> will be delivered by{' '}
          <strong>github</strong>, members are able to access{' '}
          <strong>source code</strong> based on authentication preferences by
          the <strong>token</strong>.
        </div>
        <h3>Data safety</h3>
        <div>
          monolisa.app does not store your <strong>source code</strong>. Instead
          it stores monolisa reports with matched file names. Even if it is
          provided{' '}
          <a href="https://github.com/monolisaapp/mutate" {...blank}>
            Mutate
          </a>{' '}
          strips before <strong>uploading</strong>.
        </div>
        <div>
          Furthermore, each <strong>access token</strong> delivered by{' '}
          <strong>github</strong> is encrypted by battle tested algorithms and
          not accessible without <strong>private key</strong>.
        </div>
      </section>
    </Box>
  )
}

export default Privacy
