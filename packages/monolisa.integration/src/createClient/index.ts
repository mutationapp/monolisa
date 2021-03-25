import createClient from './createClient'
import { Octokit } from '@octokit/rest'

export type createClientType = (
  auth:
    | {
        id: number
        privateKey: string
        clientId: string
        clientSecret: string
        installationId?: number
      }
    | string,
) => Promise<InstanceType<typeof Octokit>>

export default createClient
