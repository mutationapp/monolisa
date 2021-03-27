import RouteTabs from '.'
import getUrl from '../../server/shared/getUrl'

import { useAppContext } from '../../hooks'

import {
  UserIcon,
  InstallationIcon,
  GridIcon,
  OpenBookIcon,
  ActivityIcon,
  MessageIcon,
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

  if (user && user?.id !== member?.id) {
    return (
      <RouteTabs
        className="tabs"
        tabs={[
          {
            icon: <OpenBookIcon />,
            children: 'Repositories',
            value: 'repositories',
            ...buildUrl('repositories'),
          },
          {
            icon: <InstallationIcon />,
            children: 'Installations',
            value: 'installations',
            ...buildUrl('installations'),
          },
          {
            icon: <GridIcon />,
            children: 'Companies',
            value: 'companies',
            ...buildUrl('teams'),
          },
        ]}
      />
    )
  }

  return member ? (
    <RouteTabs
      className="tabs"
      tabs={[
        {
          icon: <ActivityIcon />,
          children: 'Jobs',
          value: 'jobBoard',
          ...buildUrl('repositories'),
        },
        {
          icon: <GridIcon />,
          children: 'Companies',
          value: 'companies',
          ...buildUrl('teams'),
        },
        {
          icon: <InstallationIcon />,
          children: 'Installations',
          value: 'installations',
          ...buildUrl('installations'),
        },
        {
          icon: <UserIcon />,
          children: 'Account',
          value: 'account',
          ...buildUrl('account'),
        },
        {
          icon: <MessageIcon />,
          children: 'Messages',
          value: 'messages',
          ...buildUrl('account'),
        },
      ]}
    />
  ) : null
}

export default AppRouteTabs
