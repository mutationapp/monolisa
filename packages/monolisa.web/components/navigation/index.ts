import Navigation from './navigation'
import { ReactNode } from 'react'

export type navigationItemType = {
  name: string
  href: string
  icon?: ReactNode
  as?: string
  sub?: navigationItemType[]
}

export default Navigation
