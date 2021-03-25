import getInstallation from './getInstallation'
import { installationType } from 'monolisa.model'
import { getInstallations } from '..'

export type getInstallationType = (inject: {
  getInstallations: typeof getInstallations
}) => (
  payload: Partial<installationType>,
) => Promise<installationType | undefined>
export default getInstallation
