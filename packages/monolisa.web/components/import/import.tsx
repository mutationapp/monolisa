import getConfig from 'next/config'
import { Button, Box, Modal } from '..'
import { DashboardLayout } from '../layouts'
import Link from 'next/link'
import { integrationProviderType } from 'monolisa.model'

import copyToClipboard from 'copy-to-clipboard'
import fetcher from '../../hooks/fetcher'
import { Fragment, useEffect } from 'react'
import { getIntallationsUrl } from '../../server/shared'
import Loading from '../loading'
import SomethingWentWrong from '../somethingWentWrong'
import Flex from '../flex'

import {
  KeyIcon,
  getIntegrationProviderIcon,
  CheckIcon,
  BookIcon,
} from '../icons'

import {
  useLoading,
  useReducerState,
  useInstallation,
  useAppContext,
} from '../../hooks'

import {
  run,
  somethingWentWrong,
  dealWithIt,
  nothingHereYet,
} from 'monolisa.lib'
import { capitalizeFirstLetter } from 'monolisa.lib/utils/string'

const { publicRuntimeConfig } = getConfig()
const { GITHUB_APP_NAME } = publicRuntimeConfig

const Import = () => {
  const { team } = useAppContext()
  const teamMember = team?.teamMember

  const teamSlug = teamMember?.teamSlug

  const { state, setState } = useReducerState<{
    token?: string
    copied?: string
    activating?: boolean
    activatingError?: string
    selectedProvider?: integrationProviderType
    selectedRepo?: string
  }>()

  const provider = 'github'

  const { data, error } = useInstallation({
    installationId: provider,
    scope: ['repos'],
  })

  const loading = useLoading(!data && !error)

  const { token, copied } = state

  useEffect(() => {
    setTimeout(() => {
      copied && setState({ copied: undefined })
    }, 1000)
  }, [copied])

  const handleActivate = async ({
    name,
    owner,
  }: {
    name: string
    owner: string
  }) => {
    const installationId = data?.installation?.id

    if (!installationId) {
      console.error(`MISSING:`, { installationId })
      setState({ activatingError: somethingWentWrong })
      return
    }

    try {
      setState({
        activating: true,
        token: undefined,
        selectedRepo: name,
        selectedProvider: provider,
      })

      const response = await fetcher<{ token: string }>('/api/jobs', {
        method: 'PATCH',
        body: JSON.stringify({
          repository: name,
          owner,
          provider,
          installationId,
        }),
      })

      const { token } = response

      setState({
        token,
        activating: false,
        activatingError: undefined,
      })
    } catch (error) {
      setState({
        activating: false,
        token: undefined,
        activatingError: somethingWentWrong,
      })
    }
  }

  return (
    <DashboardLayout
      pull
      aside={
        data?.repos?.length ? (
          <section className="aside">
            <Flex icon={<BookIcon />}>
              <h3>Repositories</h3>
            </Flex>

            <p>Token will be delivered to use in continuous integration.</p>
          </section>
        ) : (
          ' '
        )
      }
      title="Import Repository"
    >
      <style jsx>{`
        .integration .header {
          display: flex;
          align-items: center;
        }
        .integration .header .title {
          margin-left: 10px;
        }
        .repositories {
          max-height: 500px;
          overflow-y: scroll;
          margin-top: 20px;
          margin-right: -20px;
          padding-right: 20px;
        }
        .repositories .repo {
          display: flex;
          align-items: center;
          padding: 15px 0;
          border-top: 1px solid var(--shade-2);
        }
        .repositories .repo .name {
          flex: 1;
        }
        .aside {
          position: sticky;
          top: 25px;
        }
        .aside > p {
          margin: 5px 0;
          font-size: 0.875rem;
        }
        .modalToken {
          font-size: 0.875rem;
        }
      `}</style>
      <Fragment>
        {run(() => {
          const { repos, installation } = data || {}

          // const f: repoType[] = [
          //   {
          //     name: 'yourPublicRepositroy',
          //     owner: 'ibsukru',
          //     id: 'id',
          //     private: false,
          //     url: 'url',
          //   },
          //   {
          //     name: 'yourPrivateRepositroy',
          //     owner: 'ibsukru',
          //     id: 'id',
          //     private: true,
          //     url: 'url',
          //   },
          // ]

          if (installation?.revokedAt) {
            return <Box>{dealWithIt('Installation is revoked')}</Box>
          }
          if (installation && !repos?.length) {
            return (
              <Box
                footer={
                  <div>
                    💡 Be sure you that you have granted access at least one of
                    installation repositories form{' '}
                    <a
                      href={`https://github.com/apps/${GITHUB_APP_NAME}/installations/new`}
                    >
                      here
                    </a>
                    .
                  </div>
                }
              >
                {dealWithIt(nothingHereYet)}
              </Box>
            )
          }

          if (loading) {
            return <Loading box />
          }

          if (error) {
            return <SomethingWentWrong />
          }

          return (
            <Box shadow scrollable>
              <div className="integrations">
                {run(() => {
                  if (!repos?.length) {
                    return (
                      <Fragment>
                        Nothing here yet. You can add integration from{' '}
                        <Link {...getIntallationsUrl(teamSlug)}>
                          <a>here</a>
                        </Link>
                        .
                      </Fragment>
                    )
                  }

                  return (
                    <div className="integration">
                      <h3 className="header">
                        {getIntegrationProviderIcon(provider)}
                        <span className="title">
                          {capitalizeFirstLetter(provider)} repositories.
                        </span>
                      </h3>
                      <div className="repositories">
                        {run(() => {
                          const {
                            selectedRepo,
                            selectedProvider,
                            activating,
                            activatingError,
                          } = state

                          return repos.map(repo => {
                            const { name, url, owner } = repo

                            const isSelected =
                              selectedRepo === name &&
                              selectedProvider === provider

                            return (
                              <div key={url} className="repo">
                                <span className="name">
                                  {run(() => {
                                    if (isSelected && activatingError) {
                                      return activatingError
                                    }

                                    return name
                                  })}
                                </span>
                                <Button
                                  processing={isSelected && activating}
                                  onClick={() =>
                                    handleActivate({ name, owner })
                                  }
                                  size="small"
                                  secondary
                                >
                                  Get token
                                </Button>
                              </div>
                            )
                          })
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Box>
          )
        })}
        {run(() => {
          if (!token) {
            return
          }

          const close = {
            name: 'close',
            onClick: () => {
              setState({ token: undefined, copied: undefined })
            },
          }

          const props = {
            icon: copied ? <CheckIcon /> : <KeyIcon />,
            header: copied
              ? 'Copied to the clipboard'
              : 'Here is your repository token',
            actions: [
              close,
              {
                name: 'copy',
                onClick: () => {
                  copyToClipboard(token)
                  setState({ copied: token })
                },
              },
            ],
            children: <span className="modalToken">{token}</span>,
          }

          return <Modal {...props} />
        })}
      </Fragment>
    </DashboardLayout>
  )
}

export default Import
