//https://github.com/stryker-mutator/monolisa-testing-elements/blob/4c835a8e456cfc4502388744c22b3276e8eef197/packages/monolisa-testing-elements/src/components/monolisa-test-report-file/index.ts
import React, { useEffect } from 'react'
import { fileType, mutantStatusType } from 'monolisa.model'
import { renderCode } from '../../render'
import classNames from 'classnames'
import prismjs from 'prismjs'
import 'prismjs/plugins/keep-markup/prism-keep-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/plugins/line-numbers/prism-line-numbers'

import highlightStyles from './highlight.styles'

const Highlight: React.FunctionComponent<{
  source: string
  file: fileType
  selected: mutantStatusType[]
}> = ({ source, file, selected }) => {
  if (!source || !file) {
    return null
  }

  const codeId = 'code'
  const { language } = file

  const toggle = (elements?: Element[]) =>
    document.querySelectorAll(`#${codeId} span`).forEach(element => {
      if (element.classList.contains('active')) {
        element.classList.remove('active')
        return
      }

      elements?.includes(element) && element.classList.add('active')
    })

  const handleMutantSelect = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target) return

    const isMutant = target.getAttribute('class')?.includes('mutant-select')
    if (!isMutant) {
      toggle()
      return
    }

    const wrapper = target.closest('.mutant-wrapper')
    if (!wrapper) return

    const [mutantId, mutantName, status, replacement] = [
      'id',
      'name',
      'status',
      'replacement',
    ].map(x => {
      return target.getAttribute(`mutant-${x}`)
    })

    if (
      !mutantId ||
      !mutantName ||
      !status ||
      typeof replacement !== 'string'
    ) {
      return
    }

    target.innerHTML = target.classList.contains('active')
      ? mutantId
      : `${replacement || '""'}:`

    toggle([wrapper, target])
  }
  useEffect(() => {
    if (!source || !file) {
      return
    }

    const code = document.getElementById(codeId)
    if (!code) {
      return
    }

    document.addEventListener('click', handleMutantSelect)
    code.classList.add(`language-${language}`)
    code.innerHTML = renderCode(file, source)
    prismjs.highlightElement(code)

    return () => document.removeEventListener('click', handleMutantSelect)
  }, [])
  return (
    <pre className="line-numbers">
      <style jsx>{highlightStyles}</style>
      <style jsx>{`
        pre {
          font-size: 0.875rem;
        }
      `}</style>
      <code
        id="code"
        className={classNames(
          'code',
          selected.map(s => s.toLowerCase()),
        )}
      ></code>
    </pre>
  )
}

export default Highlight
