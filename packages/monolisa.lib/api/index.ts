import { somethingWentWrong } from '..'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type errorType = (response: any, paylad?: errorPayloadType) => any

export type responsePayloadType = { data?: { [key: string]: unknown } }
export type errorPayloadType = responsePayloadType & {
  error?: string
  status?: number
}

export const ok = <T>(response, data?: T) => {
  return response.status(200).json(data)
}

export const created = (response, data?) => {
  return response.status(201).json(data)
}

export const error: errorType = (response, payload) => {
  const status = payload?.status || 500
  return response
    .status(status)
    .json({ error: payload?.error, data: payload?.data })
}

export const internalError: errorType = (response, paylad) => {
  const overrides: errorPayloadType = {
    error: somethingWentWrong,
    ...paylad,
    status: 500,
  }

  return error(response, overrides)
}

export const invalid: errorType = (response, paylad) => {
  const overrides: errorPayloadType = {
    error: 'Request is not valid.',
    ...paylad,
    status: 400,
  }
  return error(response, overrides)
}

export const unAuthorized: errorType = (response, paylad) => {
  const overrides: errorPayloadType = {
    error: 'Not authorized',
    ...paylad,
    status: 401,
  }
  return error(response, overrides)
}

export const notAllowed: errorType = (response, paylad) => {
  const overrides: errorPayloadType = {
    error: 'Not allowed',
    ...paylad,
    status: 405,
  }
  return error(response, overrides)
}

export const forbidden: errorType = (response, paylad) => {
  const overrides: errorPayloadType = {
    error: 'Forbidden',
    ...paylad,
    status: 403,
  }
  return error(response, overrides)
}

export const notFound: errorType = (response, paylad) => {
  const overrides: errorPayloadType = {
    error: 'Not found',
    ...paylad,
    status: 404,
  }
  return error(response, overrides)
}
