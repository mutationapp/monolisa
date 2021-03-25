import cookie from 'js-cookie'
import Router from 'next/router'
import { useEffect } from 'react'
import { Redirect } from '..'
import { useAppContext } from '../../hooks'

const localStorageKey = 'member'

export const logout = () => {
  cookie.remove('token')
  window.localStorage.removeItem(localStorageKey)
  Router.push('/login')
}

const withAuth = WrappedComponent => {
  const Wrapper: React.FunctionComponent = props => {
    const { member } = useAppContext()

    if (!member) {
      return <Redirect href="login" />
    }

    const handleChange = (event: StorageEvent) => {
      if (event.key === localStorageKey && !event.newValue) {
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', handleChange)

      return () => {
        window.removeEventListener('storage', handleChange)
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
