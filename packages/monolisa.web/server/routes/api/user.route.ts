import { apiRouteType } from '..'
import { getMember, memberPayloadType } from '../../shared'
import { updateUser } from 'monolisa.data'
import { ok } from 'monolisa.lib/api'
import { onlyNotNil } from 'monolisa.lib/utils/object'

const userRoute: apiRouteType = ({ server, auth }) => {
  server.patch('/api/user', auth(true), async (request, response) => {
    const member = getMember({ request })
    if (!member) {
      throw Error('Unauthorized')
    }

    const { name, email } = request.body as {
      name: string
      email: string
    }

    const updated = await updateUser({
      ...member,
      ...onlyNotNil({
        name,
        email,
      }),
    })

    return ok(response, updated)
  })

  server.get('/api/me', auth(true), async (request, response) => {
    const member = getMember({ request })
    if (!member) {
      throw Error('Unauthorized')
    }

    return ok<memberPayloadType>(response, {
      me: member,
    })
  })
}
export default userRoute
