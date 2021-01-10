import { css } from '@emotion/css'
import { Fragment, useEffect, useState } from 'react'
import { getBit, HeaderKindType, mq, queries } from '../../typography'

const U: React.FunctionComponent<{
  kind: HeaderKindType
}> = ({ kind }) => {
  const [innerWidth, setInnerWidth] = useState(() => {
    if (!process.browser) {
      return 1600
    }

    if (typeof window == null) return window.innerWidth
  })

  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [innerWidth])

  const match = queries.reduce((a, b) => {
    return Math.abs(b - innerWidth) < Math.abs(a - innerWidth) ? b : a
  })

  const index = queries.indexOf(match)
  const bit = getBit(kind)

  return (
    <Fragment>
      {[1, 2, 3, 4].map(x => {
        const flip = x === 2 || x === 3

        return (
          <div
            key={x}
            className={css(
              mq({
                // transform: 'rotate(0deg)',
                position: 'absolute',
                top: x < 3 ? 0 : 'inherit',
                bottom: x > 2 ? 0 : 'inherit',
                left: flip ? 'inherit' : 0,
                right: flip ? 0 : 'inherit',
              }),
            )}
          >
            <div
              className={css(
                mq({
                  position: 'relative',
                  fontSize: bit.fontSize,
                  lineHeight: bit.fontSize,
                  textAlign: 'center',
                  color: '#f59794',
                  // transform: 'rotate(90deg)',
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
              <span
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
                {bit.fontSize[index]}
              </span>
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default U
