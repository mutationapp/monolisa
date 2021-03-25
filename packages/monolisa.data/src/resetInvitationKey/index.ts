import { getTeam } from '..'

import resetInvitationKey from './resetInvitationKey'
import Knex from 'knex'

export type resetInvitationKeyType = (
  context: Knex,
) => (inject: {
  getTeam: typeof getTeam
}) => (teamId: string) => Promise<string | undefined>

export default resetInvitationKey
