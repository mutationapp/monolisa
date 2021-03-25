import { saveIntegrationType } from '.'
import { integrationType } from 'monolisa.model'
import { withQuery } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import { DbValidationError } from 'monolisa.lib/error'
import { encrypt } from 'monolisa.lib/rsa'

const saveIntegration: saveIntegrationType = context => ({
  getIntegration,
}) => async integration => {
  const { userId, userName, provider, email, providerUserId, ...rest } =
    integration || {}

  const accessToken = encrypt(rest.accessToken)

  if (
    !userId ||
    !accessToken ||
    !provider ||
    !userName ||
    !email ||
    !providerUserId
  ) {
    console.error('REQUIRED:', {
      userId,
      userName,
      provider,
      accessToken,
      email,
      providerUserId,
    })
    return
  }

  if (await getIntegration({ accessToken })) {
    throw new DbValidationError('ALREADY EXIST:', {
      accessToken,
    })
  }

  if (await getIntegration({ userName, provider })) {
    throw new DbValidationError('ALREADY EXIST:', {
      userName,
      provider,
    })
  }

  const id = uuidv4()

  const getQuery = withQuery<integrationType>(context)('integrations')

  await getQuery().insert({
    id,
    userId,
    userName,
    provider,
    accessToken,
    email,
    providerUserId,
  })

  return await getQuery().where('id', id).first<integrationType>()
}

export default saveIntegration
