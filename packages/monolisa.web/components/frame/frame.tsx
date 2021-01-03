import defaultsDeep from 'lodash.defaultsdeep'

import { FrameSpanType } from '.'
import { Header, render } from '..'
import { Fragment } from 'react'
import { Text } from '..'

const Frame: React.FunctionComponent<{
  weight?: 'fullBleed' | 'regular' | 'medium' | 'bold'
  span?: FrameSpanType
  heading?:
    | string
    | {
        kind: 'h1'
        text: string
        subHead?: string
      }
  brand?:
    | string
    | {
        kind: 'h1'
        text: string
      }
}> = ({ children, heading, brand, ...rest }) => {
  const weight = rest.weight || 'fullBleed'

  const span = defaultsDeep(rest.span, {
    'min-width: 0px': '16',
    'min-width: 900px': '16',
    'min-width: 1200px': '16',
    'min-width: 1600px': '16',
  }) as FrameSpanType

  return (
    <div className={`frame ${weight}`}>
      <style jsx>{`
        .frame {
          width: calc(2vw - 4.8rem);
          grid-template-columns: repeat(16, 1fr);
          grid-column-gap: 2.4rem;
          margin: 0 auto;
          height: 100%;
          display: grid;
        }

        .frame-span {
          grid-column: 1 / span ${span['min-width: 0px']};
        }

        @media screen and (min-width: 600px) {
          .frame {
            width: calc(100vw - 19.200000000000003rem);
            grid-template-columns: repeat(6, 1fr);
            grid-column-gap: 3.2rem;
          }

          .frame-span {
            grid-column: 1 / span ${span['min-width: 600px']};
          }
        }

        @media screen and (min-width: 900px) {
          .frame {
            width: calc(100vw - 21.6rem);
            grid-template-columns: repeat(12, 1fr);
            grid-column-gap: 3.6rem;
          }

          .frame-span {
            grid-column: 1 / span ${span['min-width: 900px']};
          }
        }

        @media screen and (min-width: 1200px) {
          .frame {
            width: calc(100vw - 28.799999999999997rem);
            grid-template-columns: repeat(16, 1fr);
            grid-column-gap: 4.8rem;
          }

          .frame-span {
            grid-column: 1 / span ${span['min-width: 1200px']};
          }
        }

        @media screen and (min-width: 1600px) {
          .frame {
            width: calc(100vw - 38.400000000000006rem);
            grid-template-columns: repeat(16, 1fr);
            grid-column-gap: 6.4rem;
          }

          .frame-span {
            grid-column: 1 / span ${span['min-width: 1600px']};
          }
        }

        .regular {
          padding: 10px;
        }
        .medium {
          padding: 20px;
        }
        .bold {
          padding: 20px;
        }
      `}</style>

      {(() => {
        const renderChildren = () => {
          return (
            <Fragment>
              {render(() => {
                if (typeof heading === 'string')
                  return <Header kind="h1" text={heading} />
              })}

              {render(() => {
                if (typeof heading === 'object')
                  return <Header kind={heading.kind} text={heading.text} />
              })}

              {render(() => {
                if (typeof heading === 'object' && heading.subHead)
                  return <Text content={heading.subHead} />
              })}

              {children}

              {render(() => {
                if (typeof brand === 'string')
                  return <Header kind="h1" text={brand} />
              })}

              {render(() => {
                if (typeof brand === 'object')
                  return <Header kind={brand.kind} text={brand.text} />
              })}
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