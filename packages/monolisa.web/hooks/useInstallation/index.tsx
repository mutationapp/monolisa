import useInstallation from './useInstallation'
import { integrationProviderType } from 'monolisa.model'
import { installationPayloadType } from '../../server/shared'

export type useInstallationType = (payload: {
  installationId: string | integrationProviderType
  scope?: Array<'repos' | 'integration'>
}) => { data?: installationPayloadType; error: unknown }

export default useInstallation
