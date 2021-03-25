import { resetImportType } from '.'
import { importType } from 'monolisa.model'
import { v4 as uuidv4 } from 'uuid'

const resetImport: resetImportType = context => async key => {
  const newKey = uuidv4()

  const query = () => context.table<importType>('imports')

  await query().where('key', key).update({
    key: newKey,
  })

  return await query().where('key', newKey).first()
}

export default resetImport
