import { useReducer } from 'react'

const useReducerState = <T extends object>(initial?: T) => {
  const [state, setState]: [T, (next: T) => void] = useReducer<
    (prev: T, next: T) => T
  >(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    initial || ({} as T),
  )

  return { state, setState }
}

export default useReducerState
