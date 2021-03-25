import validate from './validate'

export type validatePayloadType = {
  value?: string
  required?: boolean
  maxLength?: number
  minLength?: number
  isEmail?: boolean
  isName?: boolean
  isUserName?: boolean
  isSlug?: boolean
  match?: string
}
export { validate }
