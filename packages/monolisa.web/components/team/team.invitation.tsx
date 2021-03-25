import { useEffect, Fragment, useState } from 'react'
import {
  useTeamInvitationKey,
  useReducerState,
  useLoading,
  useAppContext,
  useTeam,
} from '../../hooks'
import { somethingWentWrong, run } from 'monolisa.lib'
import copyToClipboard from 'copy-to-clipboard'
import SomethingWentWrong from '../somethingWentWrong'
import { Box, Button, TextBox, Spinner, Loading } from '..'
import { AddUserIcon, CheckIcon } from '../icons'
import { defaultTeamSize } from 'monolisa.model'

const TeamInvitation = () => {
  const { team } = useAppContext()
  const teamMember = team?.teamMember

  if (!teamMember) {
    return null
  }

  const { teamSlug } = teamMember
  const { data: teamData, error: teamError } = useTeam(teamSlug)

  const { state, setState } = useReducerState<{
    updating?: boolean
    copied?: boolean
    revoked?: boolean
    error?: string
    warned?: boolean
  }>({
    copied: false,
    revoked: false,
    warned: false,
  })

  const [origin, setOrigin] = useState<string | undefined>()

  useEffect(() => {
    setOrigin(`${document.location.origin}`)
  }, [])

  const {
    data: invitationData,
    error: invitationError,
    reset,
  } = useTeamInvitationKey(teamMember.teamSlug)

  const isError = teamError || invitationError
  const isLoading = useLoading(!isError && !invitationError && !teamData)

  const invitationUrl = invitationData
    ? `${origin}/teams/invite/${invitationData.invitationKey}`
    : undefined

  const handleCopy = () => {
    if (!invitationUrl) {
      setState({ error: somethingWentWrong })
      return
    }

    copyToClipboard(invitationUrl)
    setState({ copied: true })
  }

  const handleCancel = () => {
    setState({ warned: false })
  }

  const handleReset = async () => {
    if (!state.warned) {
      setState({ warned: true })
      return
    }

    reset()
    setState({ revoked: true, warned: false })
  }

  useEffect(() => {
    const { copied, revoked } = state

    setTimeout(() => {
      setState({
        ...(revoked ? { revoked: false } : {}),
        ...(copied ? { copied: false } : {}),
      })
    }, 1500)
  }, [state.copied, state.revoked])

  return (
    <Fragment>
      {run(() => {
        if (state.updating) {
          return <Spinner />
        }
      })}
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          flex: 1;
        }

        ul {
          display: flex;
          margin: 0 -4px 0 10px;
        }

        ul li {
          margin: 0 4px;
        }

        p {
          flex: 1;
        }
      `}</style>
      {run(() => {
        if (isError) {
          return <SomethingWentWrong />
        }

        if (isLoading) {
          return <Loading box />
        }

        const size = team?.size ?? defaultTeamSize
        const needsResize = (teamData?.members?.length || 0) >= size

        return (
          <Box
            shadow
            header={{ children: 'Invite new people', icon: <AddUserIcon /> }}
            footer={run(() => {
              const { copied, revoked } = state

              if (needsResize) {
                return
              }

              if (state.warned) {
                return (
                  <section>
                    <p>Are you sure?</p>
                    <ul>
                      <li>
                        <Button secondary onClick={handleReset} size="small">
                          Yes
                        </Button>
                      </li>
                      <li>
                        <Button onClick={handleCancel} size="small">
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </section>
                )
              }

              return (
                <section>
                  <p>
                    {run(() => {
                      if (revoked) {
                        return 'Success, you can copy and share updated link.'
                      }
                      if (state.warned) {
                        return (
                          <Fragment>
                            This will deactivate.
                            <ul>
                              <li>
                                <Button onClick={handleReset} size="small">
                                  Yes
                                </Button>
                              </li>
                              <li>
                                <Button
                                  secondary
                                  onClick={handleCancel}
                                  size="small"
                                >
                                  Cancel
                                </Button>
                              </li>
                            </ul>
                          </Fragment>
                        )
                      }

                      return 'You can share this url.'
                    })}
                  </p>
                  <ul>
                    <li>
                      <Button
                        disabled={copied || revoked}
                        icon={copied && <CheckIcon />}
                        onClick={handleCopy}
                        size="small"
                      >
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </li>
                    <li>
                      <Button
                        disabled={copied || revoked}
                        secondary
                        onClick={handleReset}
                        size="small"
                      >
                        Reset
                      </Button>
                    </li>
                  </ul>
                </section>
              )
            })}
          >
            {run(() => {
              if (needsResize) {
                return (
                  <div className="small">
                    monolisa.app is free up to {size} seats. Feel free to{' '}
                    <a href="mailto://contact@monolisa.app">contact with us</a>{' '}
                    to resize your team.
                  </div>
                )
              }

              return <TextBox grow readOnly value={invitationUrl} />
            })}
          </Box>
        )
      })}
    </Fragment>
  )
}

export default TeamInvitation
