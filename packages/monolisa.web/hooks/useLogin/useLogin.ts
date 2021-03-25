import { useRouter } from 'next/router'

const useLogin = () => {
  const { asPath, pathname } = useRouter()

  return { href: `/login${pathname !== '/404' ? `?returnUrl=${asPath}` : ''}` }
}

export default useLogin
