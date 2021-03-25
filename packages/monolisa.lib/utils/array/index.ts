/* eslint-disable @typescript-eslint/no-explicit-any */

export const unique = (value: string, index: number, array: string[]) =>
  array.indexOf(value) == index

export const group = (arr: { [key: string]: any }[]) => {
  return arr.reduce<{
    [key: string]: any[]
  }>((result, current) => {
    Object.entries(current).forEach(([key, value]) => {
      result[key] ? result[key].push(value) : (result[key] = [value])
    })

    return result
  }, {})
}
