import useRepositoryRoute from './useRepositoryRoute'
import {
  buildRepositoryUrlPayloadType,
  buildReportCurriedType,
  buildUrlType,
} from '../../server/shared'

export type useRepositoryRouteResponseType = {
  query: buildRepositoryUrlPayloadType
  build: buildReportCurriedType
  overview: buildUrlType
  settings: buildUrlType
  pulls: buildUrlType
}

export type useRepositoryRouteType = () =>
  | useRepositoryRouteResponseType
  | undefined

export default useRepositoryRoute
