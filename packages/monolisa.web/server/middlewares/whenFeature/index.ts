import whenFeature from './whenFeature'
import { RequestHandler } from 'express'
import { togglesType } from '../../shared/featureToggles'

export type whenFeatureType = (toggles: togglesType) => RequestHandler

export default whenFeature
