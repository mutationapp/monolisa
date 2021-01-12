import { FramePropsType, getHeading } from '.'
import { Button, Header, render, Img, U } from '..'
import { Fragment, useState } from 'react'
import { Text } from '..'

import { mq, repeat as rpt } from '../../typography'
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
  // const bit = getBit(heading.kind)
  const [fullScreen, setFullScreen] = useState(false)
  const [rise, setRise] = useState<'leftRight' | 'up' | 'loaded' | undefined>()

  const state = useThemeContext()

  useEffect(() => {
    !rise &&
      setTimeout(() => {
        setRise('leftRight')
      }, 600)

    rise === 'leftRight' &&
      setTimeout(() => {
        setRise('up')
      }, 400)
  }, [rise])

  const { uFrame } = state

  const frame = uFrame

  const { containerWidth, minWidth, bit } = uFrame

  const preview = image ? previews[image.src] : undefined
  const repeat = rpt(16)

  return (
    <Flipper
      flipKey={{ rise, containerWidth }}
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: rise ? 'inherit' : 'flex-start',
        position: 'relative',
      })}
    >
      <Flipped flipId="flip">
        {render(() => {
          return (
            <div
              className={css({
                width: minWidth,
                height: '5vh',
                ...{ ...{ up: { position: 'absolute', bottom: 0 } }[rise] },
              })}
            >
              <div
                className={classNames(
                  'flip',
                  css({
                    width: minWidth,
                    height: '3vh',
                    cursor: 'pointer',
                    backgroundColor: 'var(--foreground)',
                  }),
                )}
              ></div>
              {render(() => {
                if (rise !== 'up') return null

                return (
                  <div
                    className={css(
                      mq({
                        position: 'relative',
                        overflow: 'hidden',
                        margin: `0 auto`,

                        // paddingLeft: margin,
                        // paddingRight: margin,
                        // paddingBottom: margin,
                        // backgroundColor: 'var(--shade-1)',
                      }),
                    )}
                  >
                    {/* <U kind={heading.kind} /> */}
                    <div
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: bit,
                        // marginTop: bit,
                        marginBottom: bit,
                        borderBottom: `2px solid var(--foreground)`,
                        borderTop: `2px solid var(--foreground)`,
                      })}
                    >
                      <Header kind="h3" text="[...monolisa]" />
                    </div>
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
                          width: frame.width,
                          // maxWidth,
                          padding: bit,
                          grid:
                            // grid ||
                            Array(4).fill(
                              `"${rpt(8)('content')} ${rpt(8)(
                                'image',
                              )}" / ${repeat('1fr')}`,
                            ),
                          // margin: bit.fontSize.map(
                          //   size =>
                          //     parseInt(size.replace('px', '')) *
                          //     { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight],
                          // ),
                          margin: `0 auto`,
                          height: '100%',
                          display: 'grid',
                          columnGap: bit,
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
                                      // marginBottom={bit}
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

                                  return (
                                    <div
                                      className={css({
                                        display: 'flex',
                                        gap: bit,
                                      })}
                                    >
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
                                if (!image || image?.position === 'fit')
                                  return null

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
                )
              })}
            </div>
          )
        })}
      </Flipped>
    </Flipper>
  )
}

export default Frame
