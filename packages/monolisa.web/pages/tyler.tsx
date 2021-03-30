import { MainLayout } from '../components/layouts'
import { dealWithIt } from 'monolisa.lib'
import { Box } from '../components'
import { blank } from '../components/link'

function Tyler() {
  return (
    <MainLayout
      pageTitle={'Tyler'}
      pull
      back={{ area: 'Jack', href: '/' }}
      title={dealWithIt('Tyler...')}
    >
      <style jsx>{`
        section {
          line-height: 1.5rem;
        }
      `}</style>
      <Box>
        <section>
          <strong>monolisa.app</strong> using{' '}
          <a {...blank} href="https://stryker-mutator.io">
            stryker
          </a>{' '}
          as mutator, it works great but{' '}
          <a {...blank} href="https://github.com/monolisaapp/tyler">
            <strong>Tyler</strong>
          </a>{' '}
          {'is going to challange with that'}
        </section>
      </Box>
    </MainLayout>
  )
}

export default Tyler
