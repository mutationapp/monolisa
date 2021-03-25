import { getImportType } from '.'
import { hasDefinedEntry, filter } from '../utils'
import { importType } from 'monolisa.model'
import { mergeUndefinedtoNull } from 'monolisa.lib/utils/object'

const getImport: getImportType = context => async payload => {
  if (!hasDefinedEntry(payload)) {
    console.error('ONE OF THEM REQUIRED.', mergeUndefinedtoNull(payload))
    return
  }

  return (await filter<importType>(context)('imports')(payload))?.[0]
}

export default getImport
