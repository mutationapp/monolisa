import { getRepositories, getInstallations } from 'monolisa.data'
import { apiRouteType } from '..'
import { profilePayloadType } from '../../shared'
import { ok, notFound } from 'monolisa.lib/api'
import withContext from '../../shared/withContext'
import { mapInstallation } from '../../shared/map'

const profileRoute: apiRouteType = ({ server, auth }) => {
  server.get('/api/profile/:slug', auth(), async (request, response) => {
    const { member, user } = withContext({ request }).get()

    if (!user) {
      return notFound(response)
    }

    const installations = await getInstallations(user.id)
    const installation = installations?.find(i => i.userId === user.id)

    const repositories = installation
      ? (
          await getRepositories({
            installationId: installation.id,
          })
        )?.filter(r => user.id === member?.id || r.private === false)
      : undefined

    const data: profilePayloadType = {
      repositories,
      user,
      installations: installations?.map(i => mapInstallation(i)),
    }

    return ok(response, data)
  })
}
export default profileRoute
