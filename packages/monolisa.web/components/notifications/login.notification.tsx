import Link from 'next/link'
import { useLogin } from '../../hooks'

const LoginNotification: React.FunctionComponent<{ section?: string }> = ({
  section,
}) => {
  const { href } = useLogin()
  return (
    <div>
      💡You may need to{' '}
      <Link href={href}>
        <a>login</a>
      </Link>{' '}
      to see private {section || 'details'}
    </div>
  )
}

export default LoginNotification
