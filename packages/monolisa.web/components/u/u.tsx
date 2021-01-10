import { css } from '@emotion/css'
import defaultsDeep from 'lodash.defaultsdeep'
import { createRef } from 'react'
import { useMemo } from 'react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { render } from '..'
import { getBit, HeaderKindType, mq, queries } from '../../typography'
import { FrameWeightType } from '../frame'
import createPixelGIF from './createPixelGif'

const U: React.FunctionComponent<{
  kind: HeaderKindType
  weight?: [string | null, string | null, string | null] | [string]
  frames?: [string | null, string | null, string | null, string | null]
}> = ({ kind, ...rest }) => {
  const frames = rest.frames || ['.', '.', '.', '.']
  const weights = rest.weight || ['.']

  const [id, setId] = useState<number>()

  const [innerWidth, setInnerWidth] = useState<number>(1600)

  const [offsets, setOffsets] = useState<{
    [key: string]: { top: number; left: number }
  }>()

  const setOffset = (key: string, payload: { top: number; left: number }) => {
    if (JSON.stringify(offsets?.[key]) === JSON.stringify(payload)) return
    setOffsets(defaultsDeep({ [key]: payload }, offsets))
  }

  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }

  const on = ['resize', 'load']

  useEffect(() => {
    if (!process.browser) {
      return
    }

    setId(Math.random())

    on.forEach(x => window.addEventListener(x, handleResize))

    setInnerWidth(window.innerWidth)
    return () => {
      on.forEach(x => window.removeEventListener(x, handleResize))
    }
  }, [innerWidth])

  const match = queries.reduce((a, b) => {
    return Math.abs(b - innerWidth) < Math.abs(a - innerWidth) ? b : a
  })

  const getSrc = (payload: number) => {
    const number = payload || Math.random()
    const vector = parseInt((number * 0.1).toString())

    return createPixelGIF('#' + ((vector * 0xffffff) << 0).toString(16))()
  }

  const index = queries.indexOf(match)
  const bit = getBit(kind)

  const currentFontSize = bit.fontSize[index]
  const currentFontSizeNumber = parseInt(currentFontSize.replace('px', ''))

  if (!!'true') {
    return null
  }

  return (
    <Fragment key={id}>
      {frames.map((item, frameIndex) => {
        const framePage = frameIndex + 1
        const flip = frameIndex === 1 || framePage === 2

        return (
          <Fragment key={frameIndex}>
            {(weights as string[]).map((weight, weightIndex) => {
              const wightPage = weightIndex + 1
              const weightKey = `${id}:${weightIndex}:${frameIndex}`
              const inputRef = createRef<HTMLDivElement>()
              const offSetKey = `${wightPage}${framePage}`

              const frame = offsets?.[weightKey] || 'inherit'

              return (
                <Fragment key={`${id}:offset:${offSetKey}`}>
                  {render(() => {
                    if (!frame || !weight) return

                    return (
                      <div
                        key={weightKey}
                        ref={inputRef}
                        onLoad={e => {
                          setOffset(offSetKey, {
                            top: e.currentTarget.offsetTop,
                            left: e.currentTarget.offsetLeft,
                          })
                        }}
                        className={css(
                          mq({
                            position: 'absolute',
                            top: framePage < 3 ? 0 : 'inherit',
                            bottom:
                              framePage > 2
                                ? 1 * currentFontSizeNumber
                                : 'inherit',
                            left: flip
                              ? 'inherit'
                              : weightIndex * currentFontSizeNumber,
                            right: flip ? 0 : 'inherit',
                          }),
                        )}
                      >
                        <img
                          className={css({
                            // position: 'absolute',
                            // opacity: '0',
                          })}
                          ref={createRef()}
                          key={`${weightKey}:img`}
                          width="10px"
                          height="10px"
                          // className={css({ opacity: 0 })}
                          {...{
                            src: getSrc(parseInt(offSetKey)),
                            alt: 'px',
                          }}
                        />
                        <div
                          className={css(
                            mq({
                              // position: 'absolute',
                            }),
                          )}
                        >
                          <div
                            className={css(
                              mq({
                                position: 'fixed',
                                top: offsets?.[weightKey] || 'inherit',
                                left:
                                  offsets?.[
                                    `${frameIndex + 1}${weightIndex + 1}`
                                  ]?.left || 'inherit',
                                fontSize: bit.fontSize,
                                lineHeight: bit.fontSize,
                                textAlign: 'center',
                                color: '#f59794',
                              }),
                            )}
                          >
                            <span
                              className={css(
                                mq({
                                  textAlign: 'center',
                                  width: bit.fontSize,
                                  writingMode: 'vertical-rl',
                                }),
                              )}
                            >
                              <span
                                className={css(
                                  mq({
                                    textAlign: 'center',
                                    width: bit.fontSize,
                                    writingMode: 'vertical-rl',
                                    transform: flip ? 'scale(-1, 1)' : 0,
                                    position: 'absolute',
                                    top: '5px',
                                  }),
                                )}
                              >
                                U
                              </span>
                            </span>
                            {/* <span
                              className={css(
                                mq({
                                  display: 'block',
                                  fontSize: bit.fontSize.map(
                                    x => parseInt(x.replace('px', '')) / 4,
                                  ),
                                  lineHeight: '1em',

                                  marginTop: -3,
                                  width: bit.fontSize,
                                  textAlign: 'center',
                                }),
                              )}
                            >
                              {currentFontSize}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </Fragment>
              )
            })}
          </Fragment>
        )
      })}
    </Fragment>
  )
}

export default U
