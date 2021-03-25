import { memberType, integrationProviderType } from 'monolisa.model'

const withInstalledIntegration = (member: memberType) => (
  provider: integrationProviderType,
  owner?: string,
) => {
  const installation = member.installations?.find(
    i => (owner ? i.login === owner : !!i.userId) && i.provider === provider,
  )

  if (!installation) return {}

  return {
    installation,
    integration: member.integrations?.find(
      i => i.provider === installation.provider,
    ),
  }
}

export default withInstalledIntegration
