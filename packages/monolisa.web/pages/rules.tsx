import { MainLayout } from '../components/layouts'
import { dealWithIt } from 'monolisa.lib'
import { Box } from '../components'
import Link from 'next/link'

function Rules() {
  return (
    <MainLayout
      pageTitle={dealWithIt('8 rules of monolisa.app')}
      pull
      aside={' '}
      back={{ area: 'Tyler', href: '/tyler' }}
      title={dealWithIt('8 rules of monolisa.app')}
    >
      <style jsx>{`
        ol {
          list-style: decimal inside;
          font-size: 0.875rem;
        }

        li {
          line-height: 1.5rem;
          padding: 10px 0;
          border-bottom: 1px dashed var(--shade-2);
        }

        li:last-child {
          border-bottom: none;
        }
      `}</style>
      <Box shadow>
        <ol>
          <li>
            You do not talk about <strong>monolisa.app</strong>...
          </li>
          <li>
            You DO <strong>NOT</strong> talk about the{' '}
            <strong>monolisa.app</strong>...
          </li>
          <li>
            Someone yells stop, goes limp, taps out, the <strong>fight</strong>{' '}
            is over
          </li>
          <li>
            Only 2 guys to a <strong>fight</strong>... {dealWithIt('🤖')}
          </li>
          <li>
            One <strong>fight</strong> at a time, fellas
          </li>
          <li>
            <strong>No</strong> shirt, <strong>No</strong> shoes,{' '}
            <strong>No</strong> RATs
          </li>
          <li>
            The <strong>fight</strong> will go as long as it{' '}
            <strong>has to</strong>...
          </li>
          <li>
            If this is your{' '}
            <Link href="/login">
              <a>
                <strong>first</strong>
              </a>
            </Link>{' '}
            night at <strong>monolisa.app</strong>, you have to{' '}
            <strong>fight</strong>
          </li>
        </ol>
      </Box>
    </MainLayout>
  )
}

export default Rules
