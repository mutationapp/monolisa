import { AppContextProvider, AppContext } from './appContext'
import { withContextPayloadType } from '../../server/shared/withContext'
import { memberType } from 'monolisa.model'

export type AppContextType = withContextPayloadType & {
  member?: memberType & {
    set: (me: memberType) => void
    logout: () => void
    loggingOut?: boolean
  }
}
export { AppContextProvider, AppContext }
