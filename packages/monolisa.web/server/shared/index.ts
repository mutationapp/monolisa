import getMember from '../getMember/getMember'
import getTeamUrl from './getTeamUrl'
import getIntallationsUrl from './getIntallationsUrl'

import { buildRepositoryUrl } from './buildRepositoryUrl'

import {
  integrationProviderType,
  memberType,
  repositoryType,
  integrationType,
  repoType,
  pullRequestType,
  installationType,
  teamUserType,
  teamMemberType,
  userType,
} from 'monolisa.model'

export type urlPathType = 'tree' | 'blob'

export type providerUrlPathType =
  | urlPathType
  | 'commit'
  | 'repository'
  | 'profile'

export type loginPayloadType = {
  provider: integrationProviderType
  accessToken: string
  userName: string
  email: string
}

export type loginResponseType = {
  teamInvitationKey?: string
  teamSize?: string
  teamSlug?: string
  teamSeats?: string
}

export type installationPayloadType = {
  installation?: installationType
  repos?: repoType[]
  integration?: integrationType
}

export type profilePayloadType = {
  repositories?: repositoryType[]
  user: userType
  installations?: installationType[]
}

export type teamPayloadType = {
  repositories?: repositoryType[]
  teamUser?: teamUserType
  installations?: installationType[]
  members?: teamMemberType[]
}

export type teamsPayloadType = {
  teams: teamUserType[]
}

export type teamMemberPayloadType = {
  teamMember: teamMemberType
}

export type teamInvitationPayloadType = {
  invitationKey: string
}

export type buildRepositoryUrlPayloadType = {
  provider: integrationProviderType
  owner: string
  repo: string
  path?: string
  pullNumber?: string
  mergeCommitSha?: string
}

export type buildProviderUrlPayloadType = {
  provider: integrationProviderType
  owner: string
  repo?: string
  path?: string
  pullNumber?: string
  mergeCommitSha?: string
  commitNumber?: string
}

export type memberPayloadType = {
  me: memberType
}

export type pullsResponseType = {
  pulls?: pullRequestType[]
}

export type buildUrlType = { href: string; as?: string }

export type buildRepositoryUrlType = (
  inital?: buildRepositoryUrlPayloadType,
) => buildReportCurriedType

export type buildReportCurriedType = (pathType?: urlPathType) => buildUrlType

export type reportResponseType = {
  installation: installationType
  pullRequest?: pullRequestType
  repository: repoType
}

export { buildRepositoryUrl, getMember, getTeamUrl, getIntallationsUrl }
