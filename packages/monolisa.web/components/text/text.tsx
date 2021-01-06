import { ReactNode } from 'react'
import typography, { typographyRatioType } from '../../typography'
import { HeaderKindType } from '../header'

const Text: React.FunctionComponent<{
  content: string | ReactNode
  of?: HeaderKindType
  ratio?: typographyRatioType
  addMarginBottom?: boolean
}> = ({ content, addMarginBottom, ...rest }) => {
  const of = rest.of || 'h1'
  const ratio = rest.ratio || '1/3'

  return (
    <div className={`text ${typography(of, ratio, addMarginBottom)}`}>
      {content}
    </div>
  )
}

export default Text
