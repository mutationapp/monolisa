import { FramePropsType, getHeading } from '.'
import { Button, Header, render, Img, U } from '..'
import { Fragment, useState } from 'react'
import { Text } from '..'

import { getBit, getWidth, mq, repeat as rpt } from '../../typography'
import { css } from '@emotion/css'
import classNames from 'classnames'

import { Flipper, Flipped } from 'react-flip-toolkit'
import { useThemeContext } from '../../hooks'
import { useEffect } from 'react'

const previews = {
  [`/static/images/structure-light-led-movement-158826.jpeg`]: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
}

const Frame: React.FunctionComponent<FramePropsType> = ({
  children,
  brand,
  grid,
  image,
  cta,
  ...rest
}) => {
  const weight = rest.weight || 'fullBleed'
  const heading = getHeading(rest.heading)
  const kind = heading.kind
  const bit = getBit(heading.kind)

  const { containerWidth } = useThemeContext()

  const preview = image ? previews[image.src] : undefined

  const maxWidth = getWidth(bit.fontSize)

  const repeat = rpt(16)

  const margin =
    weight === 'fullBleed'
      ? 0
      : bit.fontSize.map(
          size =>
            parseInt(size.replace('px', '')) *
            { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight],
        )

  return (
    <Flipper
      className={css({
        position: 'relative',
        height: '100vh',
        width: '100vw',
      })}
      flipKey={containerWidth}
    >
      <Flipped flipId="square">
        <div
          className={css({
            height: '100vh',
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',

            transform: 'translate(-50%, 50%)',
            backgroundColor: 'var(--shade-1)',
            ...{
              ...{
                loaded: {
                  transform: 'translate(-50%, -50%)',
                },
              }[containerWidth ? 'loaded' : 'loading'],
            },
          })}
        >
          <div
            className={css(
              mq({
                position: 'relative',
                overflow: 'hidden',
                paddingLeft: margin,
                paddingRight: margin,
                paddingBottom: margin,
                backgroundColor: 'var(--shade-1)',
              }),
            )}
          >
            <U kind={heading.kind} />
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
                    unoptimized={image.unoptimized}
                    onLoad={() => {
                      const item = document.getElementsByClassName(
                        'frame',
                      )[1] as HTMLElement | undefined

                      if (!item) return

                      item.style.background = 'none'
                    }}
                  />
                </figure>
              )
            })}
            <div
              className={`${css(
                mq({
                  // boxShadow: '0 0 0 0.2px #f59794',
                  maxWidth,
                  padding: bit.fontSize,
                  grid:
                    grid ||
                    Array(4).fill(
                      `"${rpt(8)('content')} ${rpt(8)('image')}" / ${repeat(
                        '1fr',
                      )}`,
                    ),
                  // margin: bit.fontSize.map(
                  //   size =>
                  //     parseInt(size.replace('px', '')) *
                  //     { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight],
                  // ),
                  margin: '0 auto',
                  height: '100%',
                  display: 'grid',
                  columnGap: bit.fontSize,
                  position: 'relative',
                  overflow: 'hidden',
                }),
              )}`}
            >
              <U
                kind={heading.kind}
                frames={[null, null, '.', '.']}
                weight={
                  {
                    regular: ['.', null, null],
                    medium: ['.', '.', null],
                    bold: ['.', '.', '.'],
                  }[weight]
                }
              />
              {(() => {
                const renderChildren = () => {
                  return (
                    <Fragment>
                      <div>
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

                          console.log(
                            `🚀 ~ file: frame.tsx ~ line 207 ~ {render ~ bit`,
                            bit,
                          )

                          return (
                            <div className={css({ display: 'flex', gap: bit })}>
                              {cta.map((action, i) => {
                                const { children } = action
                                return (
                                  <Button
                                    {...{
                                      ...action,
                                      of: heading.kind,
                                      key: i,
                                    }}
                                  >
                                    {children}
                                  </Button>
                                )
                              })}
                            </div>
                          )
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
                        overflow: 'hidden',
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
                                  background: preview
                                    ? `url(${preview})`
                                    : 'none',
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
                                unoptimized={image.unoptimized}
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
              })()}
            </div>
          </div>
        </div>
      </Flipped>
    </Flipper>
  )
}

export default Frame
