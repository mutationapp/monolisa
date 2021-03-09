import { FrameListPropsType, getHeading } from '.'
import { render } from '..'
import { Fragment, useState } from 'react'

import { mq } from '../../typography'
import { css } from '@emotion/css'

import { Flipper } from 'react-flip-toolkit'
import { useThemeContext } from '../../hooks'
import { useEffect } from 'react'

import ponyo, { appRouterType, frameType } from '../../store.ghibli/apps/ponyo'
import { Observable } from 'rxjs'
import { useRouter } from 'next/dist/client/router'
import { localesType } from '../../i18n'

const Frame: React.FunctionComponent<FrameListPropsType> = ({
  children,
  brand,
  grid,
  cta,
  frames,
  ...rest
}) => {
  const { containerWidth, bit, width } = useThemeContext()

  const router = useRouter()
  const monolisa = ponyo({ timeStamp: Date.now() })({
    router: {
      locale: router.locale,
      path: router.asPath,
    } as appRouterType,
  })

  const [frameElements, setFrameElements] = useState<JSX.Element[]>()

  useEffect(() => {
    ;(async () => {
      // const t = await monolisa?.frames.toPromise()
      // const tt = await (await t.toPromise()).render({ bit, width })

      // setFrms([tt])

      monolisa?.frames.forEach(frame => {
        if (frame instanceof Observable) {
          const simple: Observable<frameType> = frame as Observable<frameType>

          simple.subscribe(async x => {
            const render = await x.render.toPromise()
            setFrameElements([render({ bit, width })])
          })
        }
      })

      // setNow(now + tick)
      // setNow(Date.now())
    })()
  }, [])

  return (
    <Fragment>
      {render(() => {
        return (
          <Flipper
            flipKey={{ containerWidth }}
            className={css({
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            })}
          >
            <div
              className={css({
                width,
              })}
            >
              <div
                className={css(
                  mq({
                    position: 'relative',
                    overflow: 'hidden',
                  }),
                )}
              >
                {frameElements}
              </div>
            </div>
          </Flipper>
        )
      })}
    </Fragment>
  )
}

export default Frame
