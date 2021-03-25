import { dealWithIt } from '../..'
import { validatePayloadType } from '..'
import {
  checkIfName,
  checkIfEmail,
  checkIfUserName,
  checkIfSlug,
} from '../checkIf'

const validate: (
  payload: validatePayloadType,
  value: string,
) => string | undefined = (
  {
    required,
    maxLength,
    minLength,
    isEmail,
    isName,
    isUserName,
    isSlug,
    match,
  },
  value,
) => {
  if (required && value.length === 0) {
    const error = dealWithIt('Can not be empty')
    return error
  }

  if (maxLength && value.length > maxLength) {
    const error = dealWithIt(`Max length is ${maxLength}`)
    return error
  }

  if (minLength && value.length < minLength) {
    const error = dealWithIt(`Min length is ${minLength}`)
    return error
  }

  if (isEmail && value.length > 0 && !checkIfEmail(value)) {
    const error = dealWithIt(`Not an email`)
    return error
  }

  if (isName && value.length > 0 && !checkIfName(value)) {
    const error = dealWithIt(`Not a valid name`)
    return error
  }

  if (isUserName && value.length > 0 && !checkIfUserName(value)) {
    const error = dealWithIt(
      `Not a valid userName. Only lowercase letters and numbers are allowed`,
    )
    return error
  }

  if (isSlug && value.length > 0 && !checkIfSlug(value)) {
    const error = dealWithIt(
      `Not a valid slug. Only lowercase letters and numbers are allowed`,
    )
    return error
  }

  if (match && !new RegExp(match).test(value)) {
    const error = dealWithIt(`${name} should match ${match}`)
    return error
  }
}

export default validate
