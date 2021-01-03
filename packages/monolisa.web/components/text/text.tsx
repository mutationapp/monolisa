import typography, { typographyRatioType } from '../../typography'
import { HeaderKindType } from '../header'

const Text: React.FunctionComponent<{
  content: string
  of?: HeaderKindType
  ratio?: typographyRatioType
}> = ({ content, ...rest }) => {
  const of = rest.of || 'h1'
  const ratio = rest.ratio || '1/3'

  return <div className={`text ${typography(of, ratio)}`}>{content}</div>
}

export default Text
