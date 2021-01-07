import Img from 'next/image'
import defaultsDeep from 'lodash.defaultsdeep'

import { FrameSpanType, getHeading } from '.'
import { Button, Header, render } from '..'
import { Fragment } from 'react'
import { Text } from '..'

import {
  getBit,
  getWidth,
  HeaderKindType,
  mq,
  repeat as rpt,
} from '../../typography'
import { css } from '@emotion/css'
import { ButtonPropsType } from '../button'
import classNames from 'classnames'

const previews = {
  '/static/images/structure-light-led-movement-158826.jpeg':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
}

const Frame: React.FunctionComponent<{
  weight?: 'fullBleed' | 'regular' | 'medium' | 'bold'
  span?: FrameSpanType
  heading:
    | string
    | {
        kind: HeaderKindType
        text: string
        subHead?: string
      }
  brand?: string
  cta?: Array<ButtonPropsType & { children: string }>
  image?: {
    src: string
    alt: string
    position?: 'fit' | 'left' | 'right'
  }
}> = ({ children, brand, image, cta, ...rest }) => {
  const weight = rest.weight || 'fullBleed'
  const span = defaultsDeep(rest.span, {
    'min-width: 0px': '16',
    'min-width: 900px': '16',
    'min-width: 1200px': '16',
    'min-width: 1600px': '16',
  }) as FrameSpanType

  const heading = getHeading(rest.heading)
  const bit = getBit(heading.kind)

  const preview = image ? previews[image.src] : undefined

  const maxWidth = getWidth(bit.fontSize)

  const repeat = rpt(16)
  console.log(
    `🚀 ~ file: frame.tsx ~ line 59 ~ repeat`,
    bit.fontSize.map(
      size =>
        parseInt(size.replace('px', '')) *
        { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight],
    ),
  )

  const margin =
    weight === 'fullBleed'
      ? 0
      : bit.fontSize.map(
          size =>
            parseInt(size.replace('px', '')) *
            { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight],
        )

  return (
    <div
      className={css(
        mq({
          position: 'relative',
          overflow: 'hidden',
          paddingLeft: margin,
          paddingRight: margin,
          paddingBottom: margin,
        }),
      )}
    >
      {render(() => {
        if (image?.position !== 'fit') return

        return (
          <figure
            className={classNames(
              css({
                position: 'absolute',
                top: '0',
                left: '0',
                background: preview ? `url(${preview})` : 'none',
              }),
            )}
          >
            <Img
              width={'2000px'}
              height={'2000px'}
              src={image.src}
              alt={image.alt}
              className={'img'}
              objectFit={'fill'}
              onLoad={() => {
                const item = document.getElementsByClassName('frame')[1] as
                  | HTMLElement
                  | undefined

                if (!item) return

                item.style.background = 'none'
              }}
            />
          </figure>
        )
      })}
      <div
        className={`frame ${weight} ${css(
          mq({
            maxWidth,
            padding: bit.fontSize,
            grid: Array(4).fill(
              `"${rpt(8)('content')} ${rpt(8)('image')}" / ${repeat('1fr')}`,
            ),
            // margin: bit.fontSize.map(
            //   size =>
            //     parseInt(size.replace('px', '')) *
            //     { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight],
            // ),
            margin: '0 auto',
            height: '100%',
            display: 'grid',
            position: 'relative',
            overflow: 'hidden',
          }),
        )}`}
      >
        <style jsx>{`
          .frame-span {
            grid-column: 1 / span ${span['min-width: 0px']};
          }

          // @media screen and (min-width: 600px) {
          //   .frame {
          //     width: calc(100vw - 19.200000000000003rem);
          //     grid-template-columns: repeat(6, 1fr);
          //     grid-column-gap: 3.2rem;
          //   }

          //   .frame-span {
          //     grid-column: 1 / span ${span['min-width: 600px']};
          //   }
          // }

          // @media screen and (min-width: 900px) {
          //   .frame {
          //     width: calc(100vw - 21.6rem);
          //     grid-template-columns: repeat(12, 1fr);
          //     grid-column-gap: 3.6rem;
          //   }

          //   .frame-span {
          //     grid-column: 1 / span ${span['min-width: 900px']};
          //   }
          // }

          // @media screen and (min-width: 1200px) {
          //   .frame {
          //     width: calc(100vw - 28.799999999999997rem);
          //     grid-template-columns: repeat(16, 1fr);
          //     grid-column-gap: 4.8rem;
          //   }

          //   .frame-span {
          //     grid-column: 1 / span ${span['min-width: 1200px']};
          //   }
          // }

          // @media screen and (min-width: 1600px) {
          //   .frame {
          //     width: calc(100vw - 38.400000000000006rem);
          //     grid-template-columns: repeat(16, 1fr);
          //     grid-column-gap: 6.4rem;
          //   }

          //   .frame-span {
          //     grid-column: 1 / span ${span['min-width: 1600px']};
          //   }
          // }

          // img,
          // .img {
          //   position: absolute;
          //   width: 100%;
          //   top: 0;
          //   left: 0;
          // }

          // figure {
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          // }

          // .wrapper {
          //   position: relative;
          // }
        `}</style>

        {(() => {
          const renderChildren = () => {
            return (
              <Fragment>
                <div className="wrapper">
                  {render(() => {
                    if (typeof heading !== 'object') return

                    return (
                      <Header
                        marginBottom={bit.fontSize}
                        kind={heading.kind}
                        text={heading.text}
                      />
                    )
                  })}

                  {render(() => {
                    if (typeof heading !== 'object') return

                    const { subHead, kind } = heading

                    if (!subHead) return

                    return (
                      <Text
                        content={subHead}
                        of={kind}
                        ratio="1/3"
                        marginBottom="bit"
                      />
                    )
                  })}

                  {children}

                  {render(() => {
                    if (typeof heading !== 'object') return
                    if (typeof brand !== 'string') return

                    const { kind } = heading
                    if (!kind) return

                    return (
                      <Header
                        text={brand}
                        kind={kind}
                        marginBottom="bit"
                        ratio="2/3"
                      />
                    )
                  })}
                  {render(() => {
                    if (!heading || !cta?.length) {
                      return
                    }

                    return cta.map(action => {
                      const { children } = action
                      return (
                        <Button of={heading.kind} key={children}>
                          {children}
                        </Button>
                      )
                    })
                  })}
                </div>
              </Fragment>
            )
          }

          return (
            <Fragment>
              <div
                className={css({
                  gridArea: 'content',
                })}
              >
                {renderChildren()}
              </div>
              <div
                className={css({
                  gridArea: 'image',
                })}
              >
                {render(() => {
                  if (!image || image?.position === 'fit') return null

                  return (
                    <div className={css({ position: 'relative' })}>
                      <figure
                        className={classNames(
                          css({
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            background: preview ? `url(${preview})` : 'none',
                          }),
                        )}
                      >
                        <Img
                          width={'2000px'}
                          height={'2000px'}
                          src={image.src}
                          alt={image.alt}
                          className={'img'}
                          objectFit={'fill'}
                          onLoad={() => {
                            const item = document.getElementsByClassName(
                              'frame',
                            )[1] as HTMLElement | undefined

                            if (!item) return

                            item.style.background = 'none'
                          }}
                        />
                      </figure>
                    </div>
                  )
                })}
              </div>
            </Fragment>
          )

          return rest.span ? (
            <div className="frame-span">{renderChildren()}</div>
          ) : (
            renderChildren()
          )
        })()}
      </div>
    </div>
  )
}

export default Frame
