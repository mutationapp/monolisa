import * as tokenize from './tokenize'
import hash from './hash'

import { BinaryLike } from 'crypto'

export type hashType = (value: BinaryLike) => string

export type keyValuePairType = { [key: string]: unknown }

export type userBaseType = {
  email: string
  name: string
  slug: string
}

export type userType = userBaseType & {
  id: string
  key: string
}

export type teamProfileType = {
  team: teamBaseType
  installations?: installationType[]
}

export type memberType = {
  id: string
  key: string
  email: string
  name: string
  slug: string
  teams?: teamMemberType[]
  installations?: installationType[]
  integrations?: integrationType[]
}

export type teamContextPayloadType = {
  name: string
  id: string
  size?: number
  teamMember?: teamMemberType
  installations?: installationType[]
}

export type integrationProviderType = 'github' | 'bitbucket'

export type integrationBaseType = {
  provider: integrationProviderType
  providerUserId: string
  accessToken: string
  userName: string
  email: string
  userId: string
}

export type installationBaseType = {
  login: string
  providerInstallationId: string
  teamId?: string
  userId?: string
  provider: integrationProviderType
  revokedAt?: Date | null
  accessToken?: string
}

export type installationType = installationBaseType & {
  id: string
}

export type withAuthType = {
  auth: string
}

export type repoType = {
  owner: string
  id: string
  name: string
  url: string
  token?: string
  private: boolean
}

export type blobType = {
  content: string
  encoding: string
  sha: string
  size: number
  url: string
}

export const defaultTeamSize = 3
export const unlimitedTeamSize = 999999
export const partners = ['getdazn', 'stryker-mutator', 'mutationapp']

export type teamBaseType = {
  size?: number
  slug: string
  createdBy?: string
  reviewComments?: boolean
}

export type teamType = teamBaseType & {
  id: string
  invitationKey?: string
}

export type roleType = 'Owner' | 'Member'

export type userTeamType = {
  role: roleType
  userId: string
  teamId: string
}

export const availableRoles: roleType[] = ['Owner', 'Member']

export const isOwner: (payload?: { role: roleType }) => boolean = payload =>
  payload?.role === 'Owner'

export type teamUserType = userTeamType & {
  teamSlug: string
  teamCreatedBy?: string
}

export type teamMemberType = teamUserType & userBaseType

export type integrationType = integrationBaseType & {
  id: string
}

export type withTimeStamps = {
  createdTime: Date
  updatedTime: Date
}

export type importBaseType = {
  installationId: string
  repo: string
  owner: string
}

export type importType = Readonly<{
  key: string
}> &
  withTimeStamps &
  importBaseType

export type repositoryType = {
  id: string
  installationId: string
  repo: string
  owner: string
  private: boolean
} & withTimeStamps

export type jobType = {
  id: string
  createdBy?: string
  teamId: string
  details: string
  summary: string
} & withTimeStamps

export type pullRequestStateType = 'open' | 'closed'

export type pullRequestBaseType = {
  integrationId?: string
  repositoryId: string
  pullNumber: string
  title: string
  mergeCommitSha: string
  state: pullRequestStateType
}

export type pullRequestType = pullRequestBaseType & {
  id: string
}

export type filesType = {
  [key: string]: fileType
}

export type fileType = {
  mutants?: Array<mutantType>
  language?: string
  source?: string
  monolisa?: monolisaType
}

export type monolisaType = scoreType & {
  key?: string
  compare?: monolisaType
  pullRequestId?: string
}

export type mutantStatusType = 'Killed' | 'Survived'

export type mutantBaseType = {
  id: string
  mutatorName: string
  replacement: string
  status: mutantStatusType
}

export type mutantType = mutantBaseType & {
  location: {
    end: { column: number; line: number }
    start: { column: number; line: number }
  }
}

export type scoreBaseType = {
  killed: number
  survived: number
}

export type scoreType = scoreBaseType & {
  total: number
  score: number
}

export { hash, tokenize }
