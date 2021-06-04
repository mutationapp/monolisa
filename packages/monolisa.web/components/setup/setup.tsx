import SetupNavigation from './setupNavigation'

import { getSection } from './shared'
import { MainLayout } from '../layouts'
import { run } from 'monolisa.lib'
import { useRouter } from 'next/router'

import {
  Installation,
  Integration,
  Import,
  Privacy,
  Introduction,
  Courses,
  Contact,
} from '.'

function Setup() {
  const { asPath, pathname } = useRouter()

  const isHome = pathname === '/'
  const title = isHome ? 'monolisa testing supercharged.' : 'Setup'
  const section = getSection(asPath)

  return (
    <MainLayout
      pageTitle={title}
      pull
      aside={<SetupNavigation />}
      back={!isHome}
      title={title}
      width={{ main: '70%', aside: '30%' }}
    >
      {run(() => {
        if (section === 'introduction') {
          return <Introduction />
        }

        if (section === 'privacy') {
          return <Privacy />
        }

        if (section === 'installation') {
          return <Installation />
        }

        if (section === 'import') {
          return <Import />
        }

        if (section === 'integration') {
          return <Integration />
        }

        if (section === 'contact') {
          return <Contact />
        }

        if (section === 'courses') {
          return <Courses />
        }
      })}
    </MainLayout>
  )
}

export default Setup
