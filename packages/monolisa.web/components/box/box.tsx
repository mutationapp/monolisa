import classNames from 'classnames'
import { ReactNode, Fragment, useRef, useEffect, useState } from 'react'
import { run } from 'monolisa.lib'
import { nilType } from 'monolisa.lib/types'

import Button, { ButtonPropsType } from '../button'
import { Flex } from '..'
import { ScrollIcon } from '../icons'

export type boxHeaderType = {
  children?: string | ReactNode
  icon?: ReactNode
  button?: ButtonPropsType & {
    children: ReactNode
  }
}
const Box: React.FunctionComponent<{
  header?: string | boxHeaderType
  shadow?: boolean
  push?: boolean
  className?: string
  footer?: ReactNode
  backgroundColor?: string
  scrollable?: boolean
}> = ({
  className,
  header,
  footer,
  push,
  shadow,
  children,
  scrollable,
  ...rest
}) => {
  const backgroundColor = rest.backgroundColor || 'var(--background)'

  const [hasScroll, setHasScroll] = useState<boolean>()
  const contentRef = useRef<HTMLDivElement>(null)

  const isScrolling = (el: HTMLElement | nilType) => {
    return el
      ? el.scrollHeight > el.offsetHeight && !(el.offsetWidth > el.scrollWidth)
      : false
  }

  useEffect(() => {
    scrollable && setHasScroll(isScrolling(contentRef.current))
  })

  return (
    <div className={classNames('box', className, { shadow, push, scrollable })}>
      <style jsx>{`
        .box {
          border: 1px solid var(--shade-2);
          padding: 20px;
          border-radius: var(--radius);
          background-color: ${backgroundColor};
        }
        .box.shadow {
          box-shadow: var(--shadow);
        }

        .box.push {
          margin-bottom: 10px;
        }
        header {
          display: flex;
          align-items: center;
          width: 100%;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid var(--shade-2);
        }
        header.only {
          border-bottom: none;
          margin-bottom: 0;
        }
        .header-icon {
          display: inline-flex;
          margin-right: 10px;
        }
        .header-content {
          flex: 1;
        }
        footer {
          flex: 1;
          background-color: var(--shade-1);
          padding: 5px;
          margin: 20px -20px -20px -20px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          border-bottom-left-radius: var(--radius);
          border-bottom-right-radius: var(--radius);
          border-top: 1px dashed var(--shade-2);
        }

        .box.scrollable .content {
          max-height: 400px;
          overflow-y: scroll;
          margin-right: -20px;
          padding-right: 20px;
        }

        .box.scrollable footer {
          margin-top: 0;
        }
        .box.scrollable header {
          margin-bottom: 0;
        }

        ._content {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      {run(() => {
        if (!header && !header?.['children']) {
          return
        }

        return (
          <header
            className={classNames({
              only: !Boolean(children),
            })}
          >
            {run(() => {
              if (typeof header === 'string') {
                return header
              }

              const { icon, children, button } = header

              return (
                <Fragment>
                  {run(() => {
                    if (!icon) return
                    return <span className="header-icon">{icon}</span>
                  })}
                  {run(() => {
                    if (!children) {
                      return
                    }

                    return <div className="header-content">{children}</div>
                  })}
                  {run(() => {
                    if (!button) {
                      return
                    }

                    return <Button {...button}>{button.children}</Button>
                  })}
                </Fragment>
              )
            })}
          </header>
        )
      })}
      <div ref={contentRef} className="content">
        {children}
      </div>
      {run(() => {
        if (!footer && (!scrollable || !hasScroll)) {
          return
        }

        return (
          <footer>
            {run(() => {
              if (footer) {
                return footer
              }

              if (scrollable && hasScroll) {
                return (
                  <Flex icon={<ScrollIcon />}>
                    <span>You can scroll through the list</span>
                  </Flex>
                )
              }
            })}
          </footer>
        )
      })}
    </div>
  )
}

export default Box
