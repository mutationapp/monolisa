import Knex from 'knex'
import {
  withUser,
  withRepository,
  withPullRequest,
  withTimeStamps as injectTimeStamps,
  withTeam,
  tables,
  withInstallation,
  withIntegration,
} from './common'

export const up = async (knex: Knex) => {
  const { schema } = knex
  const withTimeStamps = injectTimeStamps(knex)

  return schema
    .createTable(tables.users, table => {
      table.uuid('id').notNullable().primary()
      table.uuid('key').notNullable()

      table.string('slug', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('name', 255).notNullable()
      withTimeStamps(table)
    })
    .createTable(tables.teams, table => {
      table.uuid('id').notNullable().primary()
      table.uuid('invitationKey').notNullable()
      table.string('slug', 255).notNullable()
      table.integer('size').notNullable()
      table.boolean('reviewComments').notNullable()

      withUser(table, 'createdBy').nullable()
      withTimeStamps(table)
    })
    .createTable(tables.userTeams, table => {
      table.string('role', 255).notNullable()
      withUser(table)
      withTeam(table)

      withTimeStamps(table)
    })
    .createTable(tables.jobs, table => {
      table.string('details').notNullable()
      withTeam(table)

      withTimeStamps(table)
    })
    .createTable(tables.integrations, table => {
      table.uuid('id').notNullable().primary()

      table.integer('providerUserId').notNullable()
      table.string('userName', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('provider', 50).notNullable()
      table.string('accessToken', 500).notNullable()

      withUser(table)

      withTimeStamps(table)
    })
    .createTable(tables.installations, table => {
      table.uuid('id').notNullable().primary()
      table.string('login', 255).notNullable()
      table.string('provider', 50).notNullable()
      table.string('providerInstallationId', 50).notNullable()
      table.timestamp('revokedAt')
      table.string('accessToken', 255)

      withUser(table).nullable()
      withTeam(table).nullable()
      withTimeStamps(table)
    })
    .createTable(tables.repositories, table => {
      table.uuid('id').notNullable().primary()

      table.string('repo', 255).notNullable()
      table.string('owner', 255).notNullable()
      table.boolean('private').notNullable()
      table.jsonb('monolisa')

      withInstallation(table)
      withTimeStamps(table)
    })
    .createTable(tables.pullRequests, table => {
      table.uuid('id').notNullable().primary()

      table.string('pullNumber', 255).notNullable()
      table.string('mergeCommitSha', 255).notNullable()
      table.string('title', 255).notNullable()
      table.string('state', 10).notNullable()
      table.jsonb('monolisa')

      withRepository(table)
      withIntegration(table).nullable()
      withTimeStamps(table)
    })
    .createTable(tables.reports, table => {
      withPullRequest(table, 'pullRequestId').primary()

      table.json('originalReport').notNullable()
      table.jsonb('mainReport').notNullable()
      table.jsonb('relativeReport').notNullable()
      table.jsonb('meta').notNullable()
      table.string('version', 10).nullable()

      withPullRequest(table, 'relativeTo').nullable()
      withRepository(table)
      withTimeStamps(table)
    })
    .createTable(tables.imports, table => {
      table.uuid('key').notNullable().primary()

      table.string('repo', 255).notNullable()
      table.string('owner', 255).notNullable()

      withInstallation(table)
      withTimeStamps(table)
    })
}

export const down = async (knex: Knex) => {
  return knex.schema
    .dropTableIfExists(tables.imports)
    .dropTableIfExists(tables.reports)
    .dropTableIfExists(tables.pullRequests)
    .dropTableIfExists(tables.repositories)
    .dropTableIfExists(tables.installations)
    .dropTableIfExists(tables.integrations)
    .dropTableIfExists(tables.userTeams)
    .dropTableIfExists(tables.jobs)
    .dropTableIfExists(tables.teams)
    .dropTableIfExists(tables.users)
}
