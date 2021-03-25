import { installationType } from 'monolisa.model'
import { saveInstallationType } from '.'
import { withQuery } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import { onlyDefined } from 'monolisa.lib/utils/object'
import { encrypt } from 'monolisa.lib/rsa'

const saveInstallation: saveInstallationType = context => async ({
  login,
  providerInstallationId,
  teamId,
  userId,
  provider,
  revokedAt,
  ...rest
}) => {
  const accessToken = rest.accessToken ? encrypt(rest.accessToken) : undefined

  if (!userId && !teamId) {
    console.error('ONE OF THEM REQUIRED:', {
      userId,
      teamId,
    })
    return
  }

  if (userId && teamId) {
    console.error('ONLY ONE OF THEM APPLICABLE:', {
      userId,
      teamId,
    })
    return
  }

  if (!providerInstallationId || !login || !provider) {
    console.error('REQUIRED:', {
      providerInstallationId,
      login,
      provider,
    })
    return
  }

  const query = withQuery<installationType>(context)('installations')
  const providerInstallationQuery = () =>
    query()
      .where('providerInstallationId', providerInstallationId)
      .andWhere('provider', provider)

  const current = await providerInstallationQuery().first()

  if (current) {
    await query()
      .where('login', login)
      .update({
        ...current,
        ...onlyDefined({
          login,
          userId,
          teamId,
          providerInstallationId,
          revokedAt,
          accessToken,
        }),
      })

    return await providerInstallationQuery().first()
  }

  const id = uuidv4()

  await query().insert({
    login,
    id,
    userId,
    teamId,
    providerInstallationId,
    provider,
    accessToken,
  })

  return await providerInstallationQuery().first()
}

export default saveInstallation
