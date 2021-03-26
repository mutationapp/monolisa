import { Header, Heading, Wrapper } from '..'

import { LeftIcon, BikeIcon } from '../icons'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import classNames from 'classnames'
import { run } from 'monolisa.lib'
import Head from 'next/head'
import { getTeamUrl } from '../../server/shared'
import { useAppContext } from '../../hooks'

export type backType = LinkProps & {
  area: string
}

export type MainLayoutPropsType = {
  title?: ReactNode
  pageTitle?: string
  subtitle?: ReactNode
  back?: boolean | backType
  heading?: ReactNode
  laside?: ReactNode
  aside?: ReactNode
  pull?: boolean
  width?: {
    aside: string
    main: string
  }
}

const MainLayout: React.FunctionComponent<MainLayoutPropsType> = ({
  aside,
  title,
  subtitle,
  back,
  heading,
  pull,
  laside,
  pageTitle,
  children,
  width,
}) => {
  const { user, member, team } = useAppContext()

  const teamSlug = team?.name

  const buildTeamUrl = teamSlug ? getTeamUrl(teamSlug) : undefined

  const className = classNames('wrapper', {
    withAside: !!aside || !!laside,
    pull,
  })

  const mainWidth = width ? width.main : '60%'
  const asideWidth = width ? width.aside : '40%'

  const headTitle = `monolisa ${pageTitle ? `| ${pageTitle}` : ''}`

  return (
    <div className="mainLayout">
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headTitle} />
      </Head>
      <style jsx>{`
        .mainLayout {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .footer-content {
          display: flex;
          align-items: center;
        }
        .footer-content .icon {
          display: inline-flex;
          margin-right: 10px;
        }
        .footer-content .bike {
          margin-right: 10px;
          display: inline-flex;
        }
        .mainLayout :global(.wrap) {
          background-color: var(--shade-1);
          flex: 1;
          padding-bottom: 20px;
        }
        .mainLayout main {
          padding-top: 20px;
        }
        .wrapper.pull main {
          margin-top: -45px;
        }
        .wrapper.withAside {
          display: flex;
        }
        .withAside main {
          width: ${mainWidth};
        }

        aside {
          width: ${asideWidth};
          margin: 20px 0 10px 50px;
        }
        .back a {
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
        }
        .back .text {
          margin-left: 5px;
        }
        .subtitle {
          font-size: 0.875rem;
        }
        .subtitle.hasBack {
          margin: 5px 0 2px 0;
        }
        footer {
          padding: 10px 0 15px 10px;
          border-top: 1px dotted var(--shade-2);
          background-color: var(--background);
          font-size: 0.775rem;
        }

        @media screen and (max-width: 960px) {
          .wrapper.withAside {
            flex-direction: column;
          }
          .withAside main {
            width: 100%;
            order: 0;
          }

          aside {
            width: 100%;
            margin: 0;
            order: 1;
            margin: 10px 0;
          }
        }
      `}</style>
      <Header />
      {run(() => {
        if (heading) return <Heading>{heading}</Heading>

        if (!title) return

        return (
          <Heading>
            <h1>{title}</h1>
            {run(() => {
              if (back === false) {
                return
              }

              const { area, ...props } =
                typeof back === 'object'
                  ? back
                  : (() => {
                      const area = 'jobs'

                      if (buildTeamUrl) {
                        return { area, ...buildTeamUrl('profile') }
                      }

                      if (user) {
                        return {
                          area,
                          href: '/jobs',
                          as: `/${user.slug}`,
                        }
                      }

                      if (member) {
                        return {
                          area,
                          href: '/jobs',
                          as: `/${member.slug}`,
                        }
                      }

                      return { area: 'home', href: `/` }
                    })()

              if (!props) {
                return
              }

              return (
                <div className="back">
                  <Link {...props}>
                    <a>
                      <LeftIcon />
                      <span className="text">Back to {area}</span>
                    </a>
                  </Link>
                </div>
              )
            })}
            {run(() => {
              if (!subtitle) {
                return
              }

              return (
                <div
                  className={classNames('subtitle', {
                    hasBack: back !== false,
                  })}
                >
                  {subtitle}
                </div>
              )
            })}
          </Heading>
        )
      })}
      <Wrapper className="wrap">
        <div className={className}>
          {run(() => {
            if (!laside) return
            return <aside>{laside}</aside>
          })}
          <main>{children}</main>
          {run(() => {
            if (!aside) return
            return <aside>{aside}</aside>
          })}
        </div>
      </Wrapper>
      <footer>
        <Wrapper>
          <div className="footer-content">
            <Link href="/setup?section=contact">
              <a className="icon" title="contact">
                <BikeIcon />
              </a>
            </Link>
          </div>
        </Wrapper>
      </footer>
    </div>
  )
}
export default MainLayout
