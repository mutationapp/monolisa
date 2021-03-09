import classNames from 'classnames'

import { css } from '@emotion/css'
import { Header, Text, render, Img } from '..'
import { HeaderKindType, mq, repeat } from '../../typography'

export type GridPropsType = {
  width: number
  kind?: HeaderKindType
  bit: number
  title?: string
  brand?: string
  content?: string
  image?: {
    src: string
    alt: string
    fit?: 'cover' | 'contain'
    aside?: 'left' | 'right'
  }
}

const Grid: React.FunctionComponent<GridPropsType> = ({
  width,
  image,
  bit,
  title,
  brand,
  content,
  kind = 'h3',
}) => {
  const grid: string = {
    noImage: `"${repeat(8)('content')} ${repeat(8)('image')}" / ${repeat(16)(
      '1fr',
    )}`,
    imgLeft: `"${repeat(8)('image')} ${repeat(8)('content')}" / ${repeat(16)(
      '1fr',
    )}`,
    imgRight: `"${repeat(8)('content')} ${repeat(8)('image')}" / ${repeat(16)(
      '1fr',
    )}`,
  }[
    {
      left: 'imgLeft',
      right: 'imgRight',
    }[image?.aside || 'left'] || 'noImage'
  ]

  return (
    <div
      className={`${css(
        mq({
          width: width - 2 * bit,
          backgroundColor: 'var(--shade-2)',
          padding: bit,
          grid,
          display: 'grid',
          columnGap: bit,
          position: 'relative',
          overflow: 'hidden',
          marginTop: bit,
        }),
      )}`}
    >
      <div
        className={css({
          gridArea: 'content',
        })}
      >
        {title && <Header marginBottom={`${bit}px`} kind={kind} text={title} />}

        {content && (
          <Text content={content} of={kind} ratio="1/3" marginBottom="bit" />
        )}

        {brand && (
          <Header
            text={brand}
            kind={kind}
            marginBottom={bit.toString()}
            ratio="2/3"
          />
        )}
      </div>
      {render(() => {
        if (!image) return

        return (
          <div
            className={css({
              position: 'relative',
            })}
          >
            <figure
              className={classNames(
                css({
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }),
              )}
            >
              <Img
                {...{
                  ...{
                    src: image.src,
                    alt: image.alt,
                    width,
                    height: '100%',
                  },
                }}
              />
            </figure>
          </div>
        )
      })}
    </div>
  )
}

export default Grid
