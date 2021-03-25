import { withContextType } from '.'
import { IncomingMessage } from 'http'
import { mapUser, mapInstallation } from '../map'

const withContext: (ctx: {
  request: IncomingMessage
}) => withContextType = ctx => ({
  get: () => {
    const request = ctx.request
    if (!request) {
      return {}
    }

    return {
      member: request?.['member'],
      user: request?.['user'],
      team: request?.['team'],
      installation: request?.['installation'],
      repository: request?.['repository'],
    }
  },
  set: ({ user, member, installation, repository, team }) => {
    const request = ctx.request
    if (!request) {
      return
    }

    request['user'] = user ? mapUser(user) : undefined
    request['member'] = member
    request['installation'] = installation
      ? mapInstallation(installation)
      : undefined
    request['repository'] = repository
    request['team'] = team
  },
})

export default withContext
