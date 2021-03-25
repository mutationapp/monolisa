// const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

import { keyValuePairType } from 'monolisa.model'

export const mergeUndefinedtoNull = <T extends Object>(obj: T) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value === undefined ? null : value,
    }),
    {},
  )

export const mergeNulltoUndefined = <T extends Object>(obj: T) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value === null ? undefined : value,
    }),
    {},
  )

export const mergeDeep = <T extends object>(
  target: T,
  source: Partial<T>,
  overrideWhen?: (sourceValue: T) => boolean,
) => {
  const isObject = (obj: Partial<T> | T[]) => typeof obj === 'object'

  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (overrideWhen && overrideWhen(sourceValue)) {
      target[key] = sourceValue
    }

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

export type onlyType = <T extends keyValuePairType>(obj: T) => T

export const only = <T extends keyValuePairType>(
  obj: T,
  reduce: (value: unknown) => boolean,
) =>
  Object.entries(obj).reduce<T>(
    (acc, [key, value]) =>
      reduce(value)
        ? {
            ...acc,
            [key]: value,
          }
        : acc,
    {} as T,
  )

export const onlyNil: onlyType = obj => only(obj, value => value == null)
export const onlyNotNil: onlyType = obj => only(obj, value => value != null)

export const onlyNull: onlyType = obj => only(obj, value => value === null)

export const onlyNotNull: onlyType = obj => only(obj, value => value !== null)

export const onlyUndefined: onlyType = obj =>
  only(obj, value => value === undefined)

export const onlyDefined: onlyType = obj =>
  only(obj, value => value !== undefined)

export const allNotNil: (obj: keyValuePairType) => boolean = obj =>
  Object.keys(onlyNil(obj) || {}).length === 0

export const allNil: (obj: keyValuePairType) => boolean = obj =>
  Object.keys(onlyNotNil(obj) || {}).length === 0

export const allDefined: (obj: keyValuePairType) => boolean = obj =>
  Object.keys(onlyUndefined(obj) || {}).length === 0

export const removeProp = (obj: Object, propName: string) => {
  for (const prop in obj) {
    if (prop === propName) {
      delete obj[prop]
      return
    }

    if (typeof obj[prop] === 'object') removeProp(obj[prop], propName)
  }
}
