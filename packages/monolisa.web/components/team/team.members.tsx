import {
  Box,
  Avatar,
  Wizard,
  Flex,
  Select,
  SomethingWentWrong,
  Loading,
} from '..'

import {
  useTeam,
  useReducerState,
  useLoading,
  useAppContext,
} from '../../hooks'

import { useEffect } from 'react'
import { run, somethingWentWrong } from 'monolisa.lib'
import { withConfirmation } from '../wizard/getConfirmation'
import { teamMemberType, availableRoles, roleType } from 'monolisa.model'
import fetcher from '../../hooks/fetcher'
import { UsersIcon } from '../icons'

const TeamMembers = () => {
  const { team } = useAppContext()
  const teamMember = team?.teamMember

  if (!teamMember) {
    return null
  }

  const { teamSlug } = teamMember

  const { data, error } = useTeam(teamSlug)

  const loading = useLoading(!data && !error)

  type stateType = {
    deleteError?: string
    deleted?: string
    deleting?: string
    roleUpdating?: string
    roleUpdated?: string
    roleUpdateError?: string
    members?: teamMemberType[]
  }

  const { state, setState } = useReducerState<stateType>({})

  const {
    deleteError,
    members,
    deleting,
    deleted,
    roleUpdateError,
    roleUpdated,
  } = state

  ;([
    ['roleUpdateError', 'roleUpdating', 'roleUpdated'],
    ['deleteError', 'deleting', 'deleted'],
  ] as [keyof stateType, keyof stateType, keyof stateType][]).forEach(
    ([error, loading, updated]) => {
      useEffect(() => {
        ;((state[updated] && state[loading]) || state[error]) &&
          setTimeout(() => {
            setState({
              [loading]: undefined,
            })
          }, 1000)

        !state[loading] &&
          (state[updated] || state[error]) &&
          setTimeout(() => {
            setState({
              [updated]: undefined,
              [error]: undefined,
            })
          }, 1000)
      }, [state[error], state[loading], state[updated]])
    },
  )

  useEffect(() => {
    if (deleting) {
      return
    }

    const list = members || data?.members

    list &&
      setState({
        members: list.filter(x => x.userId !== deleted),
      })
  }, [data?.members, deleting])

  if (error) {
    return <SomethingWentWrong />
  }

  if (loading) {
    return <Loading box />
  }

  return (
    <Box
      scrollable
      shadow
      header={{
        children: `${members?.length ? `${members.length} ` : ''}Team members`,
        icon: <UsersIcon />,
      }}
    >
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          flex: 1;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        ul {
        }

        li {
          padding: 10px 0;
          border-bottom: 1px solid var(--shade-2);
        }

        li:last-child {
          border-bottom: none;
        }

        .avatar {
          margin-right: 10px;
        }

        .userDetails {
          flex: 1;
        }

        .userDetails .email {
          font-size: 0.675rem;
        }

        .roles {
          position: relative;
          right: -4px;
        }

        .confirmTitle {
          line-height: 2.5rem;
        }
      `}</style>
      <ul>
        {members?.map(m => {
          const { email, name, userId, role: userRole } = m as teamMemberType

          const url = `/api/teams/${teamSlug}/members/${userId}`
          const isMe = userId === teamMember.userId

          const when = (key: keyof stateType) => state[key] === userId
          const after = (key: keyof stateType) => (id?: string) => {
            return id === userId && !when(key)
          }

          const renderUser = () => {
            return (
              <Flex>
                <span className="avatar">
                  <Avatar processing={when('deleting')} name={name} />
                </span>
                {run(() => {
                  return (
                    <div className="userDetails">
                      <p className="name">
                        {run(() => {
                          if (when('deleting')) {
                            return 'deleting...'
                          }

                          return `${name}${isMe ? '(me)' : ''}`
                        })}
                      </p>
                      <p className="email">
                        {after('deleting')(deleteError) ||
                        after('roleUpdating')(roleUpdateError)
                          ? somethingWentWrong
                          : email}
                      </p>
                    </div>
                  )
                })}
                {run(() => {
                  if (when('deleting')) {
                    return
                  }

                  return (
                    <div className="roles">
                      <Select
                        value={userRole}
                        options={availableRoles.map(role => ({
                          text: role,
                          value: role,
                        }))}
                        disabled={isMe}
                        processing={when('roleUpdating')}
                        success={after('roleUpdating')(roleUpdated)}
                        error={after('roleUpdating')(roleUpdateError)}
                        onChange={async value => {
                          setState({
                            roleUpdating: userId,
                          })

                          try {
                            await fetcher(url, {
                              method: 'PATCH',
                              body: JSON.stringify({ role: value }),
                            })

                            setState({
                              roleUpdated: userId,
                              members: members.map(m =>
                                m.userId === userId
                                  ? {
                                      ...m,
                                      role: value as roleType,
                                    }
                                  : m,
                              ),
                            })
                          } catch (error) {
                            setState({ roleUpdateError: userId })
                          }
                        }}
                      />
                    </div>
                  )
                })}
              </Flex>
            )
          }

          return (
            <li key={userId}>
              {run(() => {
                if (when('deleting')) {
                  return renderUser()
                }

                return (
                  <Wizard
                    actions={
                      isMe
                        ? undefined
                        : [
                            withConfirmation({
                              title: 'remove',
                              key: 'remove',
                              confirmTitle: (
                                <div className="confirmTitle">
                                  Are you sure?
                                </div>
                              ),
                              onConfirm: async () => {
                                setState({ deleting: userId })
                                try {
                                  await fetcher(url, {
                                    method: 'DELETE',
                                  })

                                  setState({
                                    deleted: userId,
                                  })
                                } catch (error) {
                                  console.error(error)
                                  setState({ deleteError: userId })
                                }
                              },
                            }),
                          ]
                    }
                  >
                    {renderUser()}
                  </Wizard>
                )
              })}
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default TeamMembers
