import { createContext, useState } from 'react'
import { AppContextType } from '.'
import { withContextPayloadType } from '../../server/shared/withContext'
import { useRouter } from 'next/router'
import { memberTokenKey } from '../../server/shared/config'
import { useCookie } from '../../hooks'
import { useEffect } from 'react'

export const AppContext = createContext<AppContextType>({})

export const AppContextProvider: React.FunctionComponent<{
  context: withContextPayloadType
}> = ({ children, ...rest }) => {
  const { push, pathname, asPath } = useRouter()

  const [context, setContext] = useState<AppContextType>({
    ...rest.context,
    member: rest.context.member
      ? {
          ...rest.context.member,
          set: overide => {
            setContext({
              ...context,
              member: context.member
                ? {
                    ...context.member,
                    ...overide,
                  }
                : undefined,
            })
          },
          logout: () => {
            ;(async () => {
              setContext({
                ...context,
                member: context.member
                  ? {
                      ...context.member,
                      loggingOut: true,
                    }
                  : undefined,
              })

              await push(
                `/login${pathname !== '/404' ? `?returnUrl=${asPath}` : ''}`,
              )

              window.localStorage.removeItem(memberTokenKey)
            })()
          },
        }
      : undefined,
  })

  const [, setToken] = useCookie(memberTokenKey, context.member?.key || '')

  useEffect(() => {
    if (!context.member?.loggingOut) {
      return
    }

    setTimeout(() => {
      setToken('')
      setContext({
        ...context,
        member: undefined,
      })
    }, 1000)
  }, [context.member?.loggingOut])

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
