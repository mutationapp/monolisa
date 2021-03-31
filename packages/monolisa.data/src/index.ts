import knex from 'knex'
import dbConfig from './dbConfig'
import injectGetIntegration from './getIntegration'
import injectGetIntegrations from './getIntegrations'

import injectGetInstallations from './getInstallations'
import injectGetInstallation from './getInstallation'
import injectSaveInstallation from './saveInstallation'

import injectGetRepository from './getRepository'
import injectDeleteRepository from './deleteRepository'
import injectGetRepositories from './getRepositories'

import injectGetTeamMembers from './getTeamMembers'

import injectGetUserTeams from './getUserTeams'
import injectGetUserTeam from './getUserTeam'
import injectUpdateUserTeam from './updateUserTeam'
import injectDeleteUserTeam from './deleteUserTeam'

import injectGetTeams from './getTeams'
import injectGetTeam from './getTeam'
import injectSaveTeam from './saveTeam'
import injectUpdateTeam from './updateTeam'
import injectDeleteTeam from './deleteTeam'

import injectSaveJob from './saveJob'

import injectSaveUserTeam from './saveUserTeam'
import injectGetUser from './getUser'
import injectGetUsers from './getUsers'

import injectSaveIntegration from './saveIntegration'
import injectUpdateIntegration from './updateIntegration'

import injectSaveRepository from './saveRepository'

import injectSaveUser from './saveUser'
import injectUpdateUser from './updateUser'

import injectUpdateRepository from './updateRepository'

import injectGetImport from './getImport'
import injectSaveImport from './saveImport'
import injectResetImport from './resetImport'

import injectResetInvitationKey from './resetInvitationKey'

const context = knex(dbConfig)

export const saveUserTeam = injectSaveUserTeam(context)

export const getTeams = injectGetTeams(context)
export const getTeam = injectGetTeam({ getTeams })
export const saveTeam = injectSaveTeam(context)({ getTeam, saveUserTeam })
export const updateTeam = injectUpdateTeam(context)({ getTeam })
export const deleteTeam = injectDeleteTeam(context)

export const saveJob = injectSaveJob(context)

export const getTeamMembers = injectGetTeamMembers(context)({ getTeam })

export const getUserTeams = injectGetUserTeams(context)

export const getUserTeam = injectGetUserTeam(context)({ getTeam })
export const updateUserTeam = injectUpdateUserTeam(context)
export const deleteUserTeam = injectDeleteUserTeam(context)

export const getIntegrations = injectGetIntegrations(context)
export const getIntegration = injectGetIntegration({ getIntegrations })

export const getInstallations = injectGetInstallations(context)
export const getInstallation = injectGetInstallation({ getInstallations })
export const saveInstallation = injectSaveInstallation(context)

export const saveIntegration = injectSaveIntegration(context)({
  getIntegration,
})

export const updateIntegration = injectUpdateIntegration(context)({
  getIntegration,
})

export const getUser = injectGetUser(context)
export const getUsers = injectGetUsers(context)
export const saveUser = injectSaveUser(context)
export const updateUser = injectUpdateUser(context)

export const getRepositories = injectGetRepositories(context)
export const getRepository = injectGetRepository({ getRepositories })
export const saveRepository = injectSaveRepository(context)
export const updateRepository = injectUpdateRepository({
  context,
  getRepository,
})
export const deleteRepository = injectDeleteRepository(context)

export const getImport = injectGetImport(context)
export const saveImport = injectSaveImport(context)
export const resetImport = injectResetImport(context)

export const resetInvitationKey = injectResetInvitationKey(context)({
  getTeam,
})
