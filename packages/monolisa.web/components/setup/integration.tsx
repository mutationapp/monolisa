import Link from 'next/link'
import styles from './styles'
import Prism from '../highlight/prism'

import { Box } from '..'
import { blank } from '../link'
import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from 'monolisa.lib/utils/string'
import { Fragment } from 'react'

import { run } from 'monolisa.lib'
import { getSection, getSectionIcon, getSetupUrl, getSkip } from './shared'

function Installation() {
  const { asPath, pathname } = useRouter()
  const buildSetupUrl = getSetupUrl(pathname)

  const section = getSection(asPath)
  const skip = getSkip(asPath)

  const subSection = skip === 1 ? 'ci' : undefined

  return (
    <Box
      shadow
      header={{
        children: capitalizeFirstLetter(section),
        icon: getSectionIcon(section),
      }}
      footer={run(() => {
        if (subSection === 'ci') {
          return (
            <Link {...buildSetupUrl('contact')}>
              <a>go next (contact)</a>
            </Link>
          )
        }

        return (
          <Link {...buildSetupUrl('integration', 1)}>
            <a>go next (CI configuration)</a>
          </Link>
        )
      })}
    >
      <style jsx>{styles}</style>
      <section>
        {run(() => {
          if (subSection === 'ci') {
            return (
              <Fragment>
                <p>
                  When your scripts are ready configure your{' '}
                  <strong>continuos integration pipelines</strong> as following
                </p>
                <div className="code">
                  <Prism
                    language="yaml"
                    id="ci"
                    source={`name: CI
  on:
    pull_request:
      branches: [master]
  
  jobs:
    test:
      name: CI
      runs-on: ubuntu-latest
  
      steps:
        - uses: actions/checkout@v2
        - name: Use Node.js \${{matrix.node-version}}
          uses: actions/setup-node@v1
          with:
            node-version: \${{matrix.node-version}}
        - name: Install
          run: npm install
        - name: Stryker
          run: npm run stryker
        - name: Monolisa
          env:
            MONOLISA_REPOSITORY_TOKEN: \${{secrets.REPOSITORY_TOKEN}}
          run: npm run mutate
  `}
                  />
                </div>
                <div>
                  We choose to use <strong>github actions</strong> in this
                  template but you can choose other{' '}
                  <strong>continuos integration</strong> solution which provides{' '}
                  <strong>required</strong> variables
                </div>
                <div>
                  🙌 Well done!{' '}
                  <a href="https://github.com/monolisaapp/mutate" {...blank}>
                    Mutate
                  </a>{' '}
                  is ready to upload monolisa reports, you will see review
                  comments on your pull requests.
                </div>
              </Fragment>
            )
          }

          return (
            <Fragment>
              <p>
                You can use your <strong>repository token</strong> in your{' '}
                <strong>continuos integration pipelines</strong> and start
                uploading monolisa reports to <strong>monolisa.app</strong>
              </p>
              <p>
                Before doing that be sure you installed all the{' '}
                <strong>dependencies</strong> as following
              </p>
              <div className="code">
                <Prism
                  language="bash"
                  id="bash"
                  source={`npm install monolisa --save-dev`}
                />
              </div>
              <p>
                After installing dependencies configure run scripts in your{' '}
                <strong>package.json</strong>.
              </p>
              <div className="code">
                <Prism
                  language="json"
                  id="package"
                  source={`{
  "scripts": {
    "test": "jest"
    "monolisa": "monolisa"
  }
}`}
                />
              </div>
            </Fragment>
          )
        })}
      </section>
    </Box>
  )
}

export default Installation
