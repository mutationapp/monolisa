import { resetInvitationKeyType } from '.'
import { teamType } from 'monolisa.model'
import { v4 as uuidv4 } from 'uuid'
import { DbValidationError } from 'monolisa.lib/error'

const resetInvitationKey: resetInvitationKeyType = context => ({
  getTeam,
}) => async teamId => {
  const team = await getTeam({ id: teamId })
  if (!team) {
    throw new DbValidationError(`Team with name: "${name}" already exist.`, {
      name,
    })
  }

  const invitationKey = uuidv4()

  await context.table<teamType>('teams').where('id', teamId).update({
    invitationKey,
  })

  return invitationKey
}

export default resetInvitationKey
