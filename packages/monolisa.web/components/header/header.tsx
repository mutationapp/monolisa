import { Fragment } from 'react'
import headerStyles from './header.styles'
import { css } from '@emotion/css'
import { mq } from '..'
import Shevy from 'shevyjs'
import defaultsDeep from 'lodash.defaultsdeep'
import { HeaderKindType } from '.'

const Header: React.FunctionComponent<{
  text: string
  kind: HeaderKindType
}> = ({ kind, text }) => {
  const query = [
    [4.8, 3.6, 2.2, 1.8, 1.8, 1.4],
    [9.6, 4.8, 3.7, 2.4, 2.4, 1.6],
    [12.8, 6.4, 4, 3.2, 2.4, 1.8],
    [14.4, 7.2, 4.5, 3.6, 2.4, 1.8],
    [18, 9, 5.6, 4.5, 3, 2.2],
  ]
    .map(baseFontScale => {
      return new Shevy({
        baseFontSize: '10px',
        baseFontScale,
      })
    })
    .reduce((result, shevy) => {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((type, key) => {
        const { fontSize, lineHeight, marginBottom } = defaultsDeep(
          result[key],
          {
            fontSize: [],
            lineHeight: [],
            marginBottom: [],
          },
        )

        return {
          ...type,
          [key]: {
            fontSize: fontSize.concat(shevy[key].fontSize),
            lineHeight: lineHeight.concat(shevy[key].lineHeight),
            marginBottom: marginBottom.concat(shevy[key].marginBottom),
          },
        }
      }, {})
    }, {})

  const baseProps = {
    className: css(mq(query[kind])),
  }

  return (
    <Fragment>
      <style jsx>{headerStyles}</style>
      {(() => {
        if (kind === 'h1') {
          return <h1 {...baseProps}>{text}</h1>
        }

        if (kind === 'h2') {
          return <h2 {...baseProps}>{text}</h2>
        }

        if (kind === 'h3') {
          return <h3 {...baseProps}>{text}</h3>
        }

        if (kind === 'h4') {
          return <h4 {...baseProps}>{text}</h4>
        }

        if (kind === 'h5') {
          return <h5 {...baseProps}>{text}</h5>
        }

        if (kind === 'h6') {
          return <h6 {...baseProps}>{text}</h6>
        }

        return <header {...baseProps}>{text}</header>
      })()}
    </Fragment>
  )
}

export default Header
