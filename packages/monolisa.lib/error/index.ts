export type errorDataType = { [key: string]: unknown }

class AppError extends Error {
  data?: errorDataType
  constructor(message: string, data?: errorDataType) {
    super(message)

    this.name = this.constructor.name
    this.data = data
  }
}

class ApiError extends AppError {
  status: number
  constructor(status: number, message?: string, data?: errorDataType) {
    super(message || status.toString())

    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

class DbValidationError extends AppError {}

export { ApiError, AppError, DbValidationError }
