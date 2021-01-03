import { css } from '@emotion/css'
import { mq, scale } from '../../typography'
import { headerKinds, HeaderKindType, headerTypography } from '../header'

const Text: React.FunctionComponent<{
  content: string
  of?: HeaderKindType
  ratio?: '1/3' | '2/3'
}> = ({ content, ...rest }) => {
  const of = rest.of || 'h1'
  const ratio = rest.ratio || '1/3'

  return (
    <div
      className={`text ${css(
        mq(
          scale(headerTypography)(
            [headerKinds.h1],
            { '1/3': 1 / 3, '2/3': 2 / 3 }[ratio],
          )[of],
        ),
      )}`}
    >
      {content}
    </div>
  )
}

export default Text
