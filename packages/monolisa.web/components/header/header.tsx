import { Fragment } from 'react'
import { headerKinds, HeaderKindType } from '.'
import typography, { typographyRatioType } from '../../typography'

const Header: React.FunctionComponent<{
  text: string
  kind: HeaderKindType
  ratio?: typographyRatioType
  addMarginBottom?: boolean
}> = ({ kind, text, ratio = '1', addMarginBottom = true }) => {
  const baseProps = {
    className: typography({ of: kind, ratio, addMarginBottom }),
  }

  return (
    <Fragment>
      {
        {
          [headerKinds.h1]: <h1 {...baseProps}>{text}</h1>,
          [headerKinds.h2]: <h2 {...baseProps}>{text}</h2>,
          [headerKinds.h3]: <h3 {...baseProps}>{text}</h3>,
          [headerKinds.h4]: <h4 {...baseProps}>{text}</h4>,
          [headerKinds.h5]: <h5 {...baseProps}>{text}</h5>,
          [headerKinds.h6]: <h6 {...baseProps}>{text}</h6>,
        }[kind]
      }
    </Fragment>
  )
}

export default Header
