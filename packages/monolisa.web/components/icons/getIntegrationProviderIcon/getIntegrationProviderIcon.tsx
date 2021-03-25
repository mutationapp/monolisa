import { integrationProviderType } from 'monolisa.model'
import { GithubIcon } from '..'

const getIntegrationProviderIcon = (provider: integrationProviderType) =>
  provider === 'github' ? <GithubIcon /> : undefined

export default getIntegrationProviderIcon
