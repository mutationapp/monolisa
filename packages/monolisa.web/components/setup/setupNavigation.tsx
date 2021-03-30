import { useRouter } from 'next/router'
import { getSectionIcon, getSetupUrl } from './shared'

import { Navigation } from '..'
import { UserIcon, UsersIcon } from '../icons'

const SetupNavigation = () => {
  const { pathname } = useRouter()

  const buildSetupUrl = getSetupUrl(pathname)

  return (
    <Navigation
      icon
      items={[
        {
          icon: getSectionIcon('introduction'),
          name: 'Introduction',
          ...buildSetupUrl(),
        },
        {
          icon: getSectionIcon('privacy'),
          name: 'Privacy',
          ...buildSetupUrl('privacy'),
        },
        {
          icon: getSectionIcon('installation'),
          name: 'Installation',
          ...buildSetupUrl('installation'),
          sub: [
            {
              icon: <UserIcon />,
              name: 'User',
              ...buildSetupUrl('installation', 1),
            },
            {
              icon: <UsersIcon />,
              name: 'Organization',
              ...buildSetupUrl('installation', 2),
            },
          ],
        },
        {
          icon: getSectionIcon('import'),
          name: 'Import',
          ...buildSetupUrl('import'),
        },
        {
          icon: getSectionIcon('integration'),
          name: 'Integration',
          ...buildSetupUrl('integration'),
          sub: [
            { name: 'CI configuration', ...buildSetupUrl('integration', 1) },
          ],
        },
        {
          icon: getSectionIcon('contact'),
          name: 'Contact',
          ...buildSetupUrl('contact'),
        },
      ]}
    />
  )
}

export default SetupNavigation
