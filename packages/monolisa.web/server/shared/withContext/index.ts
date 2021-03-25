import withContext from './withContext'

import {
  memberType,
  userType,
  teamContextPayloadType,
  installationType,
  repositoryType,
} from 'monolisa.model'

export type withContextPayloadType = {
  member?: memberType
  user?: userType
  team?: teamContextPayloadType
  installation?: installationType
  repository?: repositoryType
}

export type withContextType = {
  get: () => withContextPayloadType
  set: (payload: withContextPayloadType) => void
}

export default withContext
