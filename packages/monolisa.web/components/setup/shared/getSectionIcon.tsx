import React from 'react'
import { sectionType } from '..'

import {
  CircleIcon,
  LockIcon,
  InstallationIcon,
  PlusIcon,
  LinkIcon,
  MailIcon,
} from '../../icons'

const getSectionIcon = (section: sectionType) => {
  switch (section) {
    case 'introduction':
      return <CircleIcon />
    case 'privacy':
      return <LockIcon />
    case 'installation':
      return <InstallationIcon />
    case 'import':
      return <PlusIcon />
    case 'integration':
      return <LinkIcon />
    case 'contact':
      return <MailIcon />
    default:
      return <CircleIcon />
  }
}

export default getSectionIcon
