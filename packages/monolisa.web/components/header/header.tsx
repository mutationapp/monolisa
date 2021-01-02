import { Fragment } from 'react'
import headerStyles from './header.styles'
import { css } from '@emotion/css'
import { mq, shevy } from '..'
import defaultsDeep from 'lodash.defaultsdeep'
import { headerKind, HeaderKindType } from '.'

const Header: React.FunctionComponent<{
  text: string
  kind: HeaderKindType
}> = ({ kind, text }) => {
  const query = [
    // min-width: 0px
    // [h1, h2, h3, h4, h5, h6]
    [4.8, 3.6, 2.2, 1.8, 1.8, 1.4],
    // min-width: 600px
    // [h1, h2, h3, h4, h5, h6]
    [9.6, 4.8, 3.7, 2.4, 2.4, 1.6],
    // min-width: 900px
    // [h1, h2, h3, h4, h5, h6]
    [12.8, 6.4, 4, 3.2, 2.4, 1.8],
    // min-width: 1200px
    // [h1, h2, h3, h4, h5, h6]
    [14.4, 7.2, 4.5, 3.6, 2.4, 1.8],
    // min-width: 1600px
    // [h1, h2, h3, h4, h5, h6]
    [18, 9, 5.6, 4.5, 3, 2.2],
  ]
    .map(baseFontScale =>
      shevy({
        baseFontScale,
      }),
    )
    .reduce(
      (acc, shevy) =>
        Object.keys(headerKind).reduce((join, key) => {
          const { fontSize, lineHeight, marginBottom } = defaultsDeep(
            acc[key],
            {
              fontSize: [],
              lineHeight: [],
              marginBottom: [],
            },
          )

          return {
            ...join,
            [key]: {
              fontSize: fontSize.concat(shevy[key].fontSize),
              lineHeight: lineHeight.concat(shevy[key].lineHeight),
              marginBottom: marginBottom.concat(shevy[key].marginBottom),
            },
          }
        }, {}),
      {},
    )

  const baseProps = {
    className: css(mq(query[kind])),
  }

  return (
    <Fragment>
      <style jsx>{headerStyles}</style>
      {
        {
          [headerKind.h1]: <h1 {...baseProps}>{text}</h1>,
          [headerKind.h2]: <h2 {...baseProps}>{text}</h2>,
          [headerKind.h3]: <h3 {...baseProps}>{text}</h3>,
          [headerKind.h4]: <h4 {...baseProps}>{text}</h4>,
          [headerKind.h5]: <h5 {...baseProps}>{text}</h5>,
          [headerKind.h6]: <h6 {...baseProps}>{text}</h6>,
        }[kind]
      }
    </Fragment>
  )
}

export default Header
