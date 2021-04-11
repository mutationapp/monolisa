import { jobType } from 'monolisa.model'
import { saveJobType } from '.'
import { withQuery } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import { DbValidationError } from 'monolisa.lib/error'

const saveJob: saveJobType = context => async ({
  createdBy,
  details,
  summary,
  teamId,
  title,
  subtitle,
}) => {
  if (!createdBy || !details || !teamId || !summary || !title || !subtitle) {
    console.error('REQUIRED:', {
      createdBy,
      details,
      summary,
      teamId,
      title,
      subtitle,
    })

    throw new DbValidationError('Required:', {
      createdBy,
      details,
      summary,
      teamId,
    })
  }

  const query = withQuery<jobType>(context)('jobs')

  const id = uuidv4()

  await query().insert({
    id,
    details,
    createdBy,
    summary,
    teamId,
    title,
    subtitle,
  })

  return await query().where('id', id).first<jobType>()
}

export default saveJob
