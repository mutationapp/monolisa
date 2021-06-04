import { Box, Logo, Button, Spinner, Flex, Redirect } from '../components'
import { GithubIcon, AddUserIcon } from '../components/icons'
import { useState, useEffect, Fragment } from 'react'
import { setAppLoading } from '../hooks/useLoading'
import Head from 'next/head'
import getConfig from 'next/config'
import { parseQuery, buildQuery } from 'monolisa.lib/utils/url'
import { useRouter } from 'next/router'
import { run, betaTesting } from 'monolisa.lib'
import { onlyDefined } from 'monolisa.lib/utils/object'
import { signProviderStateToken } from 'monolisa.model/src/tokenize'
import { useAppContext } from '../hooks'
import getUrl from '../server/shared/getUrl'
import { loginResponseType } from '../server/shared'
import { defaultTeamSize } from 'monolisa.model'

// Needs to be on build time, but it doesn't work for prod env
const { publicRuntimeConfig } = getConfig()
const { GITHUB_CLIENT_ID } = publicRuntimeConfig

function LoginPage() {
  const { member } = useAppContext()
  const router = useRouter()

  const query = router.query as loginResponseType
  const [loading, setLoading] = useState<boolean>(true)
  const [authorizeHref, setAuthorizeHref] = useState<string>()

  if (member && !member.loggingOut) {
    return <Redirect {...getUrl(member.slug)('repositories')} />
  }

  const {
    repo,
    owner,
    pullNumber,
    pullOwner,
    providerInstallationId,
    returnUrl,
  } = parseQuery(router.asPath)

  const {
    teamInvitationKey: invitationKey,
    teamSlug,
    teamSeats = 0,
    teamSize = defaultTeamSize,
  } = query

  const needsResize = teamSeats >= teamSize
  // useRouter Doesnt have it
  useEffect(() => {
    setAppLoading(Boolean(loading))
  }, [loading])

  useEffect(() => {
    setAuthorizeHref(
      signProviderStateToken(
        `${document.location.origin}/authorize${`?${buildQuery(
          onlyDefined({
            invitationKey: needsResize ? invitationKey : invitationKey,
            repo,
            owner,
            providerInstallationId,
            pullNumber,
            pullOwner,
            returnUrl,
          }),
        )}`}`,
      ),
    )
    setLoading(false)
  }, [])

  return (
    <div className="wrap">
      <Head>
        <title>monolisa | Login</title>
      </Head>
      <style jsx>{`
        .provider,
        .wrap,
        .provider :global(.loginButton) {
          display: flex;
          align-items: center;
        }
        .wrap {
          background-color: var(--shade-1);
          height: 100vh;
          justify-content: center;
        }
        .provider span {
          margin-left: 10px;
        }

        .container {
          width: 450px;
        }
        .providers {
          width: 100%;
          margin-top: 10px;
        }

        .provider :global(.loginButton) {
          justify-content: center;
          padding: 15px 5px;
          width: 100%;
        }

        .spacer {
          line-height: 0;
          color: var(--shade-2);
          font-size: 22px;
          margin-right: 10px;
        }

        .footer {
          font-size: 0.775rem;
        }
      `}</style>
      <div className="container">
        <Box
          shadow={!loading}
          footer={
            <section className="footer">
              {run(() => {
                if (invitationKey && teamSlug) {
                  if (needsResize) {
                    return (
                      <div className="small">
                        You invited to team {`'${teamSlug}'`}. But monolisa.app
                        is free up to {teamSize} seats. Feel free to{' '}
                        <a href="mailto://contact@monolisa.app">
                          contact with us
                        </a>{' '}
                        to resize your team.
                      </div>
                    )
                  }

                  return (
                    <Flex icon={<AddUserIcon />}>
                      You invited to team {`'${teamSlug}'`}
                    </Flex>
                  )
                }

                if (pullNumber && pullOwner) {
                  return (
                    <div>
                      👋&nbsp;
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://github.com/${pullOwner}`}
                      >
                        {pullOwner}
                      </a>
                      , click <strong>connect</strong> to continue. You will be
                      redirected to where you&nbsp;
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://github.com/${owner}/${repo}/pull/${pullNumber}`}
                      >
                        started
                      </a>
                      .
                    </div>
                  )
                }

                return betaTesting
              })}
            </section>
          }
          header={{
            icon: loading ? <Spinner /> : <Logo href="/" />,
            children: (
              <Fragment>
                <span>{'monolisa.app'}</span>
              </Fragment>
            ),
          }}
        >
          <div className="providers">
            <a
              className="provider"
              onClick={e => {
                if (loading) {
                  e.preventDefault()
                  return
                }

                setLoading(true)
              }}
              href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&state=${authorizeHref}`}
            >
              <Button disabled={loading} className="loginButton">
                <GithubIcon />
                <span>Connect with Github</span>
              </Button>
            </a>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default LoginPage
