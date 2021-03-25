import NProgress from 'nprogress'
import { useEffect } from 'react'

export const isAppLoading = () => {
  return localStorage.getItem('LOADING') === 'true'
}

export const setAppLoading = (loading: boolean) => {
  loading
    ? setTimeout(() => {
        isAppLoading() && NProgress.start()
      }, 200)
    : NProgress.done()

  loading
    ? localStorage.setItem('LOADING', 'true')
    : localStorage.removeItem('LOADING')
}
const useLoading = (loading: boolean) => {
  useEffect(() => {
    setAppLoading(loading)
  }, [loading])

  return loading
}

export default useLoading
