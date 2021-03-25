import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LinkProps } from 'next/link'
import { redirectErrorType } from '.'

const Redirect: React.FunctionComponent<
  LinkProps | { error: redirectErrorType }
> = props => {
  const { href, as } = (() => {
    if (props.hasOwnProperty('error')) {
      return { href: props['error'], as: undefined }
    }

    return props as LinkProps
  })()

  const router = useRouter()
  useEffect(() => {
    router.push('/' + href, as)
  }, [])
  return null
}

export default Redirect
