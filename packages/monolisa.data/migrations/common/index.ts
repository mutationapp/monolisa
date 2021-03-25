import Knex from 'knex'

export const tables = {
  users: 'users',
  integrations: 'integrations',
  repositories: 'repositories',
  projects: 'projects',
  pullRequests: 'pullRequests',
  reports: 'reports',
  imports: 'imports',
  teams: 'teams',
  installations: 'installations',
  userTeams: 'userTeams',
}

export const withIntegration = (
  table: Knex.CreateTableBuilder,
  filedName = 'integrationId',
) => {
  return table
    .uuid(filedName)
    .notNullable()
    .references('id')
    .inTable('integrations')
}

export const withInstallation = (
  table: Knex.CreateTableBuilder,
  filedName = 'installationId',
) => {
  return withTable(table)({ name: tables.installations, filedName })
}

export const withUser = (
  table: Knex.CreateTableBuilder,
  filedName = 'userId',
) => {
  return table.uuid(filedName).notNullable().references('id').inTable('users')
}

export const withTable: (
  table: Knex.CreateTableBuilder,
) => (payload: {
  name: string
  filedName: string
  nullable?: boolean
  references?: string
}) => Knex.ColumnBuilder = table => ({
  name,
  filedName,
  nullable,
  references = 'id',
}) => {
  const filed = table.uuid(filedName)
  nullable ? filed.nullable() : filed.notNullable()

  const inTable = filed.references(references).inTable(name)

  nullable
    ? inTable.onUpdate('CASCADE')
    : inTable.onUpdate('CASCADE').onDelete('CASCADE')

  return inTable
}

export const withTeam = (
  table: Knex.CreateTableBuilder,
  filedName = 'teamId',
) => {
  return withTable(table)({ name: tables.teams, filedName })
}

export const withRepository = (
  table: Knex.CreateTableBuilder,
  filedName = 'repositoryId',
) => {
  return withTable(table)({ name: tables.repositories, filedName })
}

export const withPullRequest = (
  table: Knex.CreateTableBuilder,
  filedName = 'pullRequestId',
) => {
  return table
    .uuid(filedName)
    .notNullable()
    .references('id')
    .inTable('pullRequests')
}

export const withTimeStamps = (knex: Knex) => async (
  table: Knex.CreateTableBuilder,
) => {
  const createdTime = 'createdTime'
  const updatedTime = 'updatedTime'

  table.timestamp(createdTime).defaultTo(knex.fn.now())
  table.timestamp(updatedTime).defaultTo(knex.fn.now())

  return table
}
