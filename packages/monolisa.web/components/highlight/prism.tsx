//https://github.com/stryker-mutator/monolisa-testing-elements/blob/4c835a8e456cfc4502388744c22b3276e8eef197/packages/monolisa-testing-elements/src/components/monolisa-test-report-file/index.ts
import React, { useEffect } from 'react'
import prismjs from 'prismjs'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

import highlightStyles from './highlight.styles'

const Prism: React.FunctionComponent<{
  source: string
  id: string
  language: string
}> = ({ source, id, language }) => {
  if (!source) {
    return null
  }

  const codeId = `code-${id}`

  useEffect(() => {
    const code = document.getElementById(codeId)
    if (!code) {
      return
    }

    code.classList.add(`language-${language}`)
    code.innerHTML = source
    prismjs.highlightElement(code)
  }, [])
  return (
    <pre>
      <style jsx>{highlightStyles}</style>
      <style jsx>{`
        pre,
        code {
          font-size: 0.875rem;
          white-space: pre-wrap;
          word-break: break-all;
        }
      `}</style>
      <code id={codeId}></code>
    </pre>
  )
}

export default Prism
