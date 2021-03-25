import { importType } from 'monolisa.model'
import { saveImportType } from '.'
import { withQuery } from '../utils'
import { v4 as uuidv4 } from 'uuid'

const saveImport: saveImportType = context => async (
  { owner, repo, installationId },
  reservedToken,
) => {
  const query = withQuery<importType>(context)('imports')

  const key = reservedToken || uuidv4()

  await query().insert({
    key,
    owner,
    repo,
    installationId,
  })

  return await query().where('key', key).first<importType>()
}

export default saveImport
