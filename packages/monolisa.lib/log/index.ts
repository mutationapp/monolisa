export type logType = (message?: unknown, ...optionalParams: unknown[]) => void

export const log: logType = (message?, ...optionalParams) =>
  console.log(message, optionalParams)
