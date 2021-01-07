import { Fragment } from 'react'
import typography, {
  getBit,
  headerKinds,
  HeaderKindType,
  typographyRatioType,
} from '../../typography'

const Header: React.FunctionComponent<{
  text: string
  kind: HeaderKindType
  ratio?: typographyRatioType
  marginBottom?: number | 'bit'
}> = ({ kind, text, ratio = '1', ...rest }) => {
  const marginBottom =
    typeof rest.marginBottom === 'string'
      ? getBit(kind).fontSize
      : rest.marginBottom

  const baseProps = {
    className: typography({
      of: kind,
      ratio,
      overrides: {
        marginBottom,
      },
    }),
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
