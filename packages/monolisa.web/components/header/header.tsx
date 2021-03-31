import Link from 'next/link'
import getUrl from '../../server/shared/getUrl'
import classNames from 'classnames'

import { TeamRouteTabs } from '../routeTabs'
import { getTeamUrl } from '../../server/shared'
import { Fragment } from 'react'
import { run } from 'monolisa.lib'
import { DividerIcon, GearIcon } from '../icons'
import { useRepositoryRoute, useThemeContext, useAppContext } from '../../hooks'

import {
  Avatar,
  Button,
  Logo,
  Wrapper,
  RepositoryRouteTabs,
  AppRouteTabs,
  Spinner,
} from '..'

const Header = () => {
  const { toggleTheme } = useThemeContext()
  const { user, team, member } = useAppContext()
  const teamSlug = team?.name

  const loggingOut = member?.loggingOut

  const buildTeamUrl = teamSlug ? getTeamUrl(teamSlug) : undefined

  const reportRoute = useRepositoryRoute()

  return (
    <div className="container">
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          padding: 15px 0;
        }

        .theme-switcher {
          color: var(--foreground);
          display: flex;
          cursor: pointer;
          display: inline-block;
          line-height: 1;
          font-size: 1.3rem;
          margin-top: 7px;
        }
        .theme-switcher:active {
          margin-top: 8px;
        }

        header.space-between {
          justify-content: space-between;
        }

        .container {
          border-bottom: 1px solid var(--shade-2);
        }

        .left-nav {
          flex: 1;
          font-size: 0.875rem;
        }

        .left-nav,
        .left-nav .breadcrumbs {
          display: flex;
          align-items: center;
        }

        .left-nav .breadcrumbs > * {
          display: inline-flex;
        }

        .left-nav .breadcrumb {
          margin-bottom: 2px;
        }

        .left-nav .brand {
          margin-left: 10px;
        }

        .avatar {
        }

        .avatar img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .spacer {
          margin: 0 3px;
          color: var(--shade-3);
        }

        .right-nav {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          margin: 0 -5px;
        }

        .right-nav > li {
          user-select: none;
          cursor: pointer;
          margin: 0 5px;
          color: var(--foreground);
        }

        .sub-nav {
          margin: 10px 0 0 -8px;
        }
      `}</style>
      <Wrapper>
        {run(() => {
          const renderThemeSwitcher = () => {
            return (
              <span className="theme-switcher" onClick={toggleTheme}>
                🐼
              </span>
            )
          }
          return (
            <Fragment>
              <header
                className={classNames({
                  'space-between': !member,
                })}
              >
                {run(() => {
                  const url = (() => {
                    if (reportRoute && buildTeamUrl) {
                      const { as } = buildTeamUrl('profile')
                      return { href: as }
                    }

                    return { href: `/` }
                  })()

                  return <Logo {...url} size={32} />
                })}
                {run(() => {
                  return (
                    <Fragment>
                      <section className="left-nav">
                        {run(() => {
                          const spacer = (
                            <span className="spacer">
                              <DividerIcon />
                            </span>
                          )

                          if (teamSlug) {
                            return (
                              <div className="breadcrumbs">
                                {spacer}
                                <a
                                  href={
                                    !member
                                      ? '/teams'
                                      : getUrl(member.slug)('teams').as
                                  }
                                  className="breadcrumb"
                                >
                                  organizations
                                </a>
                                {spacer}
                                <span className="breadcrumb repo">
                                  {teamSlug}
                                </span>
                              </div>
                            )
                          }

                          if (!reportRoute?.query) {
                            return <span className="brand">Monolisa.app</span>
                          }

                          if (user && member?.id !== user.id) {
                            const repositoriesUrl = buildTeamUrl
                              ? buildTeamUrl('profile')
                              : { href: `/${user.slug}` }

                            return (
                              <div className="breadcrumbs">
                                {spacer}
                                <Link {...repositoriesUrl}>
                                  <a className="breadcrumb">{user.slug}</a>
                                </Link>
                                {spacer}
                                <span className="breadcrumb repo">
                                  {reportRoute.query.repo}
                                </span>
                              </div>
                            )
                          }

                          if (member) {
                            const repositoriesUrl = buildTeamUrl
                              ? buildTeamUrl('profile')
                              : { href: `/${member.slug}` }

                            return (
                              <div className="breadcrumbs">
                                {spacer}
                                <Link {...repositoriesUrl}>
                                  <a className="breadcrumb">repositories</a>
                                </Link>
                                {spacer}
                                <span className="breadcrumb repo">
                                  {reportRoute.query.repo}
                                </span>
                              </div>
                            )
                          }
                        })}
                      </section>
                      <ul className="right-nav">
                        <li>
                          <Link href="/setup">
                            <Button
                              icon={<GearIcon />}
                              size="small"
                              secondary
                              disabled={loggingOut}
                            >
                              Setup
                            </Button>
                          </Link>
                        </li>

                        <li>{renderThemeSwitcher()}</li>
                        {member ? (
                          <Fragment>
                            <li>
                              <Link href={member.slug}>
                                <a title={member.name} className="avatar">
                                  <Avatar name={member.name} />
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Button
                                size="small"
                                secondary
                                onClick={() => member.logout()}
                                icon={loggingOut ? <Spinner /> : undefined}
                                disabled={loggingOut}
                              >
                                logout
                              </Button>
                            </li>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <li>
                              <Button link={'/login'} size="small">
                                login
                              </Button>
                            </li>
                          </Fragment>
                        )}
                      </ul>
                    </Fragment>
                  )
                })}
              </header>
              {run(() => {
                return (
                  <nav className="sub-nav">
                    {run(() => {
                      if (reportRoute) {
                        return <RepositoryRouteTabs />
                      }

                      return teamSlug ? <TeamRouteTabs /> : <AppRouteTabs />
                    })}
                  </nav>
                )
              })}
            </Fragment>
          )
        })}
      </Wrapper>
    </div>
  )
}

export default Header
