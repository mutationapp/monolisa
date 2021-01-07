import { ReactNode } from 'react'
import typography, {
  HeaderKindType,
  typographyRatioType,
} from '../../typography'

const Text: React.FunctionComponent<{
  content: string | ReactNode
  of?: HeaderKindType
  ratio?: typographyRatioType
  marginBottom?: number | 'bit'
}> = ({ content, marginBottom, ...rest }) => {
  const of = rest.of || 'h1'

  const ratio = rest.ratio || '1/3'

  return (
    <div
      className={`text ${typography({
        of,
        ratio,
        overrides: {
          marginBottom,
        },
      })}`}
    >
      {content}
    </div>
  )
}

export default Text
