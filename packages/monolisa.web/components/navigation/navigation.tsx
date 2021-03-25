import { useRouter } from 'next/router'
import Link from 'next/link'
import { navigationItemType } from '.'
import { run } from 'monolisa.lib'
import { ReactNode } from 'react'
import { HashIcon, RightIcon } from '../icons'

const Navigation: React.FunctionComponent<{
  items: navigationItemType[]
  title?: string | ReactNode
  icon?: boolean
}> = ({ items, title, icon }) => {
  const { asPath } = useRouter()

  return (
    <nav>
      <style jsx>{`
        nav {
          width: 100%;
        }
        nav .item {
          padding: 3px 0;
          font-weight: bold;
        }
        nav .title {
          margin-bottom: 7px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--shade-2);
        }
        nav .title .icon {
          margin-right: 5px;
        }

        .inner {
          display: flex;
          align-items: center;
        }

        .inner .icon {
          margin-right: 7px;
          display: inline-flex;
          width: 0.875rem;
        }

        .subnav {
          margin: 0 0 0 18px;
          font-size: 0.775rem;
        }
      `}</style>
      {run(() => {
        if (!title) {
          return
        }

        return (
          <h3 className="title">
            {icon && (
              <span className="icon">
                <HashIcon />
              </span>
            )}

            {title}
          </h3>
        )
      })}

      {items.map(({ name, href, as, icon, sub }) => {
        return (
          <div key={name} className="item">
            {asPath === (as || href) ? (
              <div className="inner">
                {icon && <span className="icon">{icon}</span>}
                {name}
              </div>
            ) : (
              <Link as={as} href={href}>
                <a className="inner">
                  {icon && <span className="icon">{icon}</span>}
                  {name}
                </a>
              </Link>
            )}
            {asPath.startsWith(as || href) && (
              <div className="subnav">
                {sub?.map(({ name, href, as, icon }) => {
                  return (
                    <div key={name} className="item">
                      {asPath === (as || href) ? (
                        <div className="inner">
                          <span className="icon">{icon || <RightIcon />}</span>
                          {name}
                        </div>
                      ) : (
                        <Link as={as} href={href}>
                          <a className="inner">
                            <span className="icon">
                              {icon || <RightIcon />}
                            </span>
                            {name}
                          </a>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Navigation
