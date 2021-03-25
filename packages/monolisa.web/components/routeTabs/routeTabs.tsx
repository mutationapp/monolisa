import Link from 'next/link'
import { RouteTabsType } from '.'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { removeQuery } from 'monolisa.lib/utils/url'
import { useThemeContext } from '../../hooks'

const RouteTabs: RouteTabsType = ({ tabs, className }) => {
  const { asPath } = useRouter()
  const { routeTabIcons, toggleRouteTabIcons } = useThemeContext()

  const relativePath = removeQuery(asPath)

  return (
    <div className={classNames('container', className)}>
      <style jsx>{`
        .tabs,
        .container {
          display: flex;
        }
        .tabs {
          flex: 1;
          line-height: 1.3;
        }
        a {
          display: flex;
          cursor: pointer;
          align-items: center;
          margin: 0 8px;
          padding-bottom: 10px;
          border-bottom: 2px solid transparent;
          color: var(--shade-5);
          font-size: 0.875rem;
        }
        a.selected,
        a:hover {
          color: var(--foreground);
        }

        a:not(.selected):hover:before {
          transform: scaleX(1);
          opacity: 1;
        }
        a:before {
          bottom: -2px;
          position: absolute;
          width: 100%;
          transform: scaleX(0.3);
          opacity: 0;
          content: '';
          border-bottom: 2px solid var(--foreground);
          transition: transform 0.1s ease-in-out, opacity 0.15s ease-in-out;
        }
        a.selected {
          font-weight: bold;
        }

        .icon {
          display: inline-flex;
          margin-right: 7px;
        }

        .routeTabIcons {
          font-size: 0.875rem;
          cursor: pointer;
        }

        .routeTabIcons::selection {
          background: transparent;
        }

        .routeTabIcons.on {
          text-decoration: line-through;
        }
      `}</style>

      <div className={'tabs'}>
        {tabs.map(({ value, children, href, as, icon }) => (
          <Link key={value} as={as} href={href}>
            <a
              className={classNames({
                selected: [as, href].some(
                  url => url?.toLowerCase() === relativePath?.toLowerCase(),
                ),
              })}
            >
              {routeTabIcons === 'show' && icon && (
                <span className="icon">{icon}</span>
              )}

              {children}
            </a>
          </Link>
        ))}
      </div>
      <span
        onClick={() => {
          toggleRouteTabIcons()
        }}
        data-i={routeTabIcons === 'show' ? 'on' : 'off'}
        className={classNames(
          'clickable',
          'routeTabIcons',
          routeTabIcons === 'show' ? 'on' : 'off',
        )}
      >
        i
      </span>
    </div>
  )
}
export default RouteTabs
