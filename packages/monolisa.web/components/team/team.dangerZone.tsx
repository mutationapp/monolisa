import { Wizard, Box } from '..'
import { useReducerState, useAppContext } from '../../hooks'
import { useEffect } from 'react'
import { dealWithIt, somethingWentWrong, run } from 'monolisa.lib'
import { withConfirmation } from '../wizard/getConfirmation'
import fetcher from '../../hooks/fetcher'
import getUrl from '../../server/shared/getUrl'

const TeamDangerZone = () => {
  const { team, member } = useAppContext()

  const teamMember = team?.teamMember

  if (!member || !teamMember) {
    return null
  }

  const { teamSlug } = teamMember

  type stateType = {
    error?: string
    deleted?: boolean
    deleting?: boolean
  }

  const { state, setState } = useReducerState<{
    error?: string
    deleted?: boolean
    deleting?: boolean
  }>({})

  const { deleting, deleted, error } = state

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

    window.location.href = getUrl(member.slug)('teams').as
  }, [deleted, deleting])

  return (
    <Box
      shadow
      header={dealWithIt('Danger zone.')}
      footer={
        <Wizard
          key={deleting ? 'deleting' : 'delete'}
          actions={[
            withConfirmation({
              processing: Boolean(deleting || error || deleted),
              title: 'delete',
              key: 'delete',
              confirmTitle: 'Are you sure?',
              onConfirm: async () => {
                setState({ deleting: true })
                try {
                  await fetcher(`/api/teams/${teamSlug}`, {
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
              return 'Deleted, going back to your teams'
            }

            return 'This will delete all related data from the system.'
          })}
        </Wizard>
      }
    ></Box>
  )
}

export default TeamDangerZone
