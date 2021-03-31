import RouteTabs, { RouteTabType } from '.'
import getUrl from '../../server/shared/getUrl'

import { useAppContext } from '../../hooks'

import {
  // InstallationIcon,
  GridIcon,
  OpenBookIcon,
  ActivityIcon,
  UserIcon,
  // MessageIcon,
} from '../icons'
import React from 'react'

const AppRouteTabs = () => {
  const { member, user } = useAppContext()

  const buildUrl = (() => {
    if (user) return getUrl(user.slug)
    if (member) return getUrl(member.slug)
  })()

  if (!buildUrl) {
    return null
  }

  const currentUser =
    user && member && user?.id === member?.id ? user : undefined

  const accountLink = currentUser
    ? {
        icon: <UserIcon />,
        children: 'Account',
        value: 'installations',
        href: `/${currentUser.slug}/account`,
        // ...buildUrl('installations'),
      }
    : undefined

  if (user) {
    return (
      <RouteTabs
        className="tabs"
        tabs={[
          {
            icon: <OpenBookIcon />,
            children: 'Profile',
            value: 'profile',
            href: `/${user.slug}`,
          },
          accountLink as RouteTabType,
          {
            icon: <GridIcon />,
            children: 'Organizations',
            value: 'organizations',
            ...buildUrl('teams'),
          },
        ].filter(Boolean)}
      />
    )
  }

  return (
    <RouteTabs
      className="tabs"
      tabs={[
        {
          icon: <ActivityIcon />,
          children: 'Jobs',
          value: 'jobs',
          href: '/',
        },
        {
          icon: <GridIcon />,
          children: 'Organizations',
          value: 'organizations',
          href: '/teams',
        },
        // {
        //   icon: <InstallationIcon />,
        //   children: 'Installations',
        //   value: 'installations',
        //   ...buildUrl('installations'),
        // },
        // {
        //   icon: <UserIcon />,
        //   children: 'Account',
        //   value: 'account',
        //   ...buildUrl('account'),
        // },
        // {
        //   icon: <MessageIcon />,
        //   children: 'Messages',
        //   value: 'messages',
        //   ...buildUrl('account'),
        // },
      ]}
    />
  )
}

export default AppRouteTabs
