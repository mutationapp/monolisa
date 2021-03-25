import { useAppContext, useReducerState } from '../../hooks'

import { Box, Button, Wizard } from '..'
import { run, dealWithIt, nothingHereYet } from 'monolisa.lib'
import { getIntegrationProviderIcon, GithubIcon } from '../icons'
import { isOwner, installationType } from 'monolisa.model'
import { buildProviderUrl } from '../../server/shared/buildRepositoryUrl'
import { withConfirmation } from '../wizard/getConfirmation'
import { LoginNotification } from '../notifications'

const Installation: React.FunctionComponent<{
  installations?: installationType[]
}> = props => {
  const { team, user, member } = useAppContext()

  if (!team && !user) {
    return null
  }

  const teamSlug = team?.name

  const {
    state: { diconnecting, installing },
    setState,
  } = useReducerState<{
    diconnecting?: string
    installing?: string
  }>({})

  const teamMember = team?.teamMember

  const isAdmin =
    (member && user?.id === member?.id) || (teamMember && isOwner(teamMember))

  const installations = props.installations?.filter(installation =>
    team ? installation.teamId === team.id : Boolean(installation.userId),
  )

  const provider = 'github'
  return (
    <div>
      <style jsx>{`
        .addIntegration .title {
          margin-bottom: 10px;
        }
        .addIntegration > :global(.provider) {
          margin-bottom: 10px;
        }

        .addIntegration .provider-name {
          margin-left: 5px;
        }
        .integration {
          display: flex;
          align-items: center;
        }
        .integration span {
          margin-left: 10px;
        }

        .install {
          display: flex;
          align-items: center;
        }

        .install .status {
          flex: 1;
        }
      `}</style>
      {run(() => {
        if (!installations?.length) {
          return (
            <Box
              footer={run(() => {
                if (!member) {
                  return <LoginNotification />
                }

                if (teamMember && !isOwner(teamMember)) {
                  return 'Contact with a team owner to make an installation.'
                }

                if (!isAdmin) {
                  return
                }

                return (
                  <Wizard
                    key={diconnecting ? 'installing' : 'install'}
                    actions={[
                      withConfirmation({
                        first: 'cancel',
                        icon: <GithubIcon />,
                        processing: installing === provider,
                        title: 'connect',
                        key: 'connect',
                        confirm: 'continue',
                        confirmTitle: `💡 Before going there, on next page, if you prefer to choose an orgainzation, ${
                          team
                            ? 'installation will be saved for the team'
                            : 'a team will be created'
                        }, elsewise installation will be saved for your profile.`,
                        onConfirm: async () => {
                          setState({ installing: provider })
                          const base = `/installations/${provider}`
                          window.location.href = teamSlug
                            ? `${base}/${teamSlug}`
                            : `${base}`
                        },
                      }),
                    ]}
                  >
                    {run(() => {
                      if (diconnecting === provider) {
                        return `You redirecting to ${provider}.`
                      }

                      return `💡 You asked for an installation from ${provider}`
                    })}
                  </Wizard>
                )
              })}
            >
              <div className="install">
                <div className="status">{dealWithIt(nothingHereYet)}</div>
                {run(() => {
                  if (!isAdmin) {
                    return
                  }

                  return (
                    <Button
                      size="small"
                      link={`/installations/${provider}`}
                      className="provider"
                      key={provider}
                      icon={getIntegrationProviderIcon(provider)}
                    >
                      install
                    </Button>
                  )
                })}
              </div>
            </Box>
          )
        }

        return (
          <Box
            shadow
            footer={run(() => {
              if (!member) {
                return <LoginNotification />
              }

              if (!isAdmin) {
                return
              }

              return (
                <Wizard
                  key={diconnecting ? 'diconnecting' : 'diconnect'}
                  actions={[
                    withConfirmation({
                      processing: diconnecting === provider,
                      title: 'disconnect',
                      icon: <GithubIcon />,
                      key: 'diconnect',
                      confirmTitle: dealWithIt(`Are you sure?`),
                      onConfirm: async () => {
                        window.location.href = teamSlug
                          ? `https://github.com/organizations/${teamSlug}/settings/installations`
                          : 'https://github.com/settings/installations'
                        setState({ diconnecting: provider })
                      },
                    }),
                  ]}
                >
                  {run(() => {
                    if (diconnecting === provider) {
                      return `You redirecting to ${provider}.`
                    }

                    return `You will be redirected ${provider} to revoke access.`
                  })}
                </Wizard>
              )
            })}
          >
            <div className="installations">
              {installations?.map(installation => (
                <div className="integration" key={installation.id}>
                  {getIntegrationProviderIcon(installation.provider)}
                  <span>
                    Connected with{' '}
                    <a
                      target="noopener"
                      href={buildProviderUrl({
                        provider: installation.provider,
                        owner: installation.login,
                      })('profile')}
                    >
                      {installation.provider}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </Box>
        )
      })}
    </div>
  )
}
export default Installation
