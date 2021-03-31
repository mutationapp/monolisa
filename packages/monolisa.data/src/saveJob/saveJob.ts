import { jobType } from 'monolisa.model'
import { saveJobType } from '.'
import { withQuery } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import { DbValidationError } from 'monolisa.lib/error'

const saveJob: saveJobType = context => async ({ createdBy, details }) => {
  if (!createdBy || !details) {
    console.error('REQUIRED:', {
      createdBy,
      details,
    })

    throw new DbValidationError('Required:', { createdBy, details })
  }

  const query = withQuery<jobType>(context)('jobs')

  const id = uuidv4()

  await query().insert({
    id,
    details,
    createdBy,
  })

  return await query().where('id', id).first<jobType>()
}

export default saveJob
