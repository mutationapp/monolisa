import defaultsDeep from 'lodash.defaultsdeep'

import { FrameSpanType } from '.'
import { Button, Header, render } from '..'
import { Fragment } from 'react'
import { Text } from '..'
import { HeaderKindType } from '../header'

import Img from 'next/image'
import { mq } from '../../typography'
import { css } from '@emotion/css'
import { ButtonPropsType } from '../button'

const Frame: React.FunctionComponent<{
  weight?: 'fullBleed' | 'regular' | 'medium' | 'bold'
  span?: FrameSpanType
  heading?:
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

  const heading =
    typeof rest.heading === 'string'
      ? {
          kind: 'h1' as HeaderKindType,
          text: rest.heading,
        }
      : rest.heading

  const preview = image
    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    : undefined

  return (
    <div
      className={`frame ${weight} ${css(
        mq({
          width:
            weight === 'fullBleed'
              ? '100%'
              : [
                  'calc(2vw - 4.8rem)',
                  'calc(100vw - 19.200000000000003rem)',
                  'calc(100vw - 21.6rem)',
                  'calc(100vw - 28.799999999999997rem)',
                  'calc(100vw - 38.400000000000006rem)',
                ],
          gridTemplateColumns: [
            'repeat(16, 1fr)',
            'repeat(6, 1fr);',
            'repeat(12, 1fr)',
            'repeat(16, 1fr);',
            'repeat(16, 1fr)',
          ],
          gridColumnGap: ['2.4rem', '3.2rem', '3.6rem', '4.8rem', ' 6.4rem;'],
          margin: '0 auto',
          height: '100%',
          display: 'grid',
          position: 'relative',
          overflow: 'hidden',
          background: preview ? `url(${preview})` : 'none',
          '&:after': {
            content: '""',
            opacity: '0.5',
            top: '0',
            left: '0',
            position: 'absolute',
          },
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

        .regular {
          padding: 10px;
        }
        .medium {
          padding: 20px;
        }
        .bold {
          padding: 20px;
        }

        img,
        .img {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }

        figure {
          position: absolute;
          top: 0;
          left: 0;
        }

        .wrapper {
          position: relative;
        }
      `}</style>

      {(() => {
        const renderChildren = () => {
          return (
            <Fragment>
              {render(() => {
                if (!image) return

                return (
                  (
                    <figure>
                      <Img
                        width={'1600px'}
                        height={'1600px'}
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
                  ) || <img src={image.src} alt={image.alt} />
                )
              })}
              <div className="wrapper">
                {render(() => {
                  if (typeof heading !== 'object') return

                  return <Header kind={heading.kind} text={heading.text} />
                })}

                {render(() => {
                  if (typeof heading !== 'object') return

                  const { subHead, kind } = heading

                  if (!subHead) return

                  return <Text content={subHead} of={kind} ratio="1/3" />
                })}

                {children}

                {render(() => {
                  if (typeof heading !== 'object') return
                  if (typeof brand !== 'string') return

                  const { kind } = heading
                  if (!kind) return

                  return <Header text={brand} kind={kind} ratio="2/3" />
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

        return rest.span ? (
          <div className="frame-span">{renderChildren()}</div>
        ) : (
          renderChildren()
        )
      })()}
    </div>
  )
}

export default Frame
