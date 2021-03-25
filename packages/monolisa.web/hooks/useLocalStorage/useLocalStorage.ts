import { useState } from 'react'

const useLocalStorage = <T>(
  key: string,
  initialValue?: T | string,
): [T | string | undefined, (value: T) => void] => {
  const [item, setValue] = useState(() => {
    const value = localStorage.getItem(key) || initialValue

    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
    )
    return value
  })

  const setItem = (item: T | string) => {
    setValue(item)
    window.localStorage.setItem(
      key,
      typeof item === 'string' ? item : JSON.stringify(item),
    )
  }
  return [item, setItem]
}

export default useLocalStorage
