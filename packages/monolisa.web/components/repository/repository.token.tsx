import {
  useRepositoryRoute,
  useReducerState,
  useLoading,
  useAppContext,
} from '../../hooks'
import { Box, Spinner, Wizard, Flex, SomethingWentWrong } from '..'
import { KeyIcon, CheckIcon } from '../icons'
import { useEffect } from 'react'
import fetcher from '../../hooks/fetcher'
import { isOwner } from 'monolisa.model'
import { run, somethingWentWrong, dealWithIt } from 'monolisa.lib'
import { withConfirmation } from '../wizard/getConfirmation'
import { ApiError } from 'monolisa.lib/error'

const RepositoryToken = () => {
  const repositoryRoute = useRepositoryRoute()
  if (!repositoryRoute) {
    return null
  }

  const { installation } = useAppContext()
  const { query } = repositoryRoute
  const { repo: repository, owner, provider } = query

  const { team } = useAppContext()

  const teamMember = team?.teamMember

  const installationId = installation?.id
  if (!installationId) {
    return null
  }

  const { state, setState } = useReducerState<{
    loading?: boolean
    error?: string
    reseting?: boolean
    success?: boolean
    key?: string
    apiError?: ApiError
  }>({
    loading: true,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetcher<{ token: string }>('/api/repositories', {
          method: 'PATCH',
          body: JSON.stringify({
            repository: query.repo,
            provider: query.provider,
            installationId,
          }),
        })

        setState({ key: response.token })
      } catch (apiError) {
        setState({ apiError })
      } finally {
        setState({ loading: false })
      }
    })()
  }, [])

  const loading = useLoading(!!state.loading)

  const { success, error, key, apiError } = state

  useEffect(() => {
    setTimeout(() => {
      success && setState({ success: undefined })
      error && setState({ error: undefined })
    }, 2000)
  }, [success, error])

  if (apiError) {
    return apiError.status === 404 ? (
      <SomethingWentWrong
        header="? Repository not found."
        footer={dealWithIt('404')}
      />
    ) : (
      <SomethingWentWrong />
    )
  }

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    )
  }

  return (
    <Box
      shadow
      header={{
        icon: <KeyIcon />,
        children: 'Use this token in your integration pipelines.',
      }}
      footer={run(() => {
        if (teamMember && !isOwner(teamMember)) {
          return
        }

        if (state.error) {
          return <Flex>{state.error}</Flex>
        }

        if (state.success) {
          return <Flex icon={<CheckIcon />}>Succeess</Flex>
        }

        if (state.reseting) {
          return <Flex icon={<Spinner />}>processing</Flex>
        }
        return (
          <Wizard
            actions={
              state.reseting
                ? undefined
                : [
                    withConfirmation({
                      title: 'reset',
                      key: 'reset',
                      confirmTitle:
                        'Current token is not going to be usuable anymore, you may need to update your CI. Are you sure?',
                      onConfirm: async () => {
                        setState({ reseting: true })

                        try {
                          const data = await fetcher<{ token: string }>(
                            '/api/repositories',
                            {
                              method: 'PATCH',
                              body: JSON.stringify({
                                repository,
                                provider,
                                owner,
                                installationId,
                                reset: state.key,
                              }),
                            },
                          )

                          setState({
                            key: data.token,
                            error: undefined,
                            reseting: false,
                            success: true,
                          })
                        } catch (error) {
                          setState({
                            error: somethingWentWrong,
                            reseting: false,
                          })
                        }
                      },
                    }),
                  ]
            }
          >
            Generate new token
          </Wizard>
        )
      })}
    >
      <style jsx>{`
        .content {
          font-size: 0.875rem;
        }
      `}</style>
      {run(() => {
        if (!key) {
          return (
            <div className="content">
              <Spinner />
            </div>
          )
        }

        return <div className="content">{state.key}</div>
      })}
    </Box>
  )
}

export default RepositoryToken
