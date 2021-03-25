export const checkIfEmail = (value?: string) => {
  if (!value) {
    return false
  }

  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value,
  )
}

export const checkIfName = (value?: string) => {
  if (!value) {
    return false
  }

  return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value.trim())
}

export const checkIfSlug = (value?: string) => {
  if (!value) {
    return false
  }

  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(value)
}

export const checkIfUserName = (value?: string) => {
  return checkIfSlug(value)
}
