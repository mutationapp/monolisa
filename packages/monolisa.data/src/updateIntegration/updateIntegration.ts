import { encrypt } from 'monolisa.lib/rsa'
import { integrationType } from 'monolisa.model'
import { updateIntegrationType } from '.'

const updateIntegration: updateIntegrationType = context => ({
  getIntegration,
}) => async ({ id, email, userName, accessToken }) => {
  if (!id) {
    console.error('REQUIRED:', {
      id,
    })
    return
  }

  const current = await getIntegration({ id })
  if (!current) {
    console.error('EMPTY:', {
      id,
    })
    return
  }

  await context
    .table<integrationType>('integrations')
    .where('id', id)
    .update({
      ...current,
      userName: userName || current.userName,
      accessToken: accessToken ? encrypt(accessToken) : current.accessToken,
      email: email || current.email,
    })

  return await getIntegration({ id })
}

export default updateIntegration
