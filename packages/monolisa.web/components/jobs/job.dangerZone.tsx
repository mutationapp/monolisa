import Loading from '../loading'
import fetcher from '../../hooks/fetcher'

import { AlertIcon } from '../icons'
import { Box, Wizard, SomethingWentWrong } from '..'
import { useEffect } from 'react'
import { dealWithIt, somethingWentWrong, run } from 'monolisa.lib'
import { isOwner } from 'monolisa.model'
import { useRepositoryRouteResponseType } from '../../hooks/useRepositoryRoute'
import { withConfirmation } from '../wizard/getConfirmation'
import { useRouter } from 'next/router'
import { buildRepositoryUrl } from '../../server/shared'

import {
  useRepositoryRoute,
  useReducerState,
  useLoading,
  useAppContext,
} from '../../hooks'
import useJob from '../../hooks/useJob'

const RepositoryDangerZone = () => {
  const { team } = useAppContext()

  const teamMember = team?.teamMember
  // const { installation } = currentContext

  const repositoryRoute = useRepositoryRoute() as useRepositoryRouteResponseType

  const { query } = repositoryRoute
  const { repo, owner, provider } = query

  const { data, error: apiError } = useJob({
    id: 'id',
  })

  const isLoading = useLoading(!data && !apiError)

  if (teamMember && !isOwner(teamMember)) {
    return null
  }

  const router = useRouter()

  type stateType = {
    error?: string
    deleted?: boolean
    deleting?: boolean
  }
  const { state, setState } = useReducerState<stateType>({})

  const { deleted, deleting, error } = state

  ;([['error', 'deleting']] as [keyof stateType, keyof stateType][]).forEach(
    ([error, loading]) => {
      useEffect(() => {
        ;(state[loading] || state[error]) &&
          setTimeout(() => {
            setState({
              [loading]: undefined,
            })
          }, 1000)

        !state[loading] &&
          state[error] &&
          setTimeout(() => {
            setState({
              [error]: undefined,
            })
          }, 1000)
      }, [state[error], state[loading]])
    },
  )

  useEffect(() => {
    if (!deleted || deleting) {
      return
    }

    if (teamMember) {
      const { as, href } = buildRepositoryUrl({ owner, provider, repo })()
      router.replace(as || href, as)
    } else {
      router.replace('/')
    }
  }, [deleted, deleting])

  if (isLoading) {
    return <Loading box />
  }

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

  return (
    <Box
      shadow
      header={{ icon: <AlertIcon />, children: dealWithIt('Danger zone') }}
      footer={
        <Wizard
          key={deleting ? 'deleting' : 'delete'}
          actions={[
            withConfirmation({
              processing: state.deleting,
              title: 'Delete',
              key: 'delete',
              confirmTitle: 'Are you sure?',
              onConfirm: async () => {
                setState({ deleting: true })
                try {
                  await fetcher(`/api/jobs/${provider}/${owner}/${repo}`, {
                    method: 'DELETE',
                  })

                  setState({ deleted: true })
                } catch (error) {
                  setState({ error: somethingWentWrong })
                }
              },
            }),
          ]}
        >
          {run(() => {
            if (error) {
              return somethingWentWrong
            }

            if (deleting) {
              return 'Deleting...'
            }

            if (deleted) {
              return 'Deleted, going back to repositories.'
            }

            return 'This will delete all related data from the system.'
          })}
        </Wizard>
      }
    >
      The repository will be permanently deleted, including all reports. This
      action is irreversable and can not be undone.
    </Box>
  )
}

export default RepositoryDangerZone
