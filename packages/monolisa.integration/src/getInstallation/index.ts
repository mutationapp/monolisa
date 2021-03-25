import getInstallation from './getInstallation'

export type getInstallationType = (payload: {
  id: number
  privateKey: string
  installationId: number
  clientId: string
  clientSecret: string
}) => Promise<{ login: string; installationId: number } | undefined>

export default getInstallation
