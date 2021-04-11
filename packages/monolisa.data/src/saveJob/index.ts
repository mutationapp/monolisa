import { jobType } from 'monolisa.model'
import saveJob from './saveJob'
import Knex from 'knex'

export type saveJobType = (
  context: Knex,
) => (payload: {
  createdBy: string
  details: string
  summary: string
  teamId: string
  title: string
  subtitle: string
}) => Promise<jobType | undefined>

export default saveJob