import { installationType, userType } from 'monolisa.model'
import { maskWithIt } from 'monolisa.lib'
import { only } from 'monolisa.lib/utils/object'

const mask = maskWithIt()

export const mapInstallation: (
  installation: installationType,
) => installationType = installation => {
  return only(
    {
      ...installation,
      accessToken: mask,
      providerInstallationId: mask,
    },
    x => x !== mask,
  )
}

export const mapUser: (user: userType) => userType = user => {
  return only(
    {
      ...user,
      email: mask,
      key: mask,
    },
    x => x !== mask,
  )
}
