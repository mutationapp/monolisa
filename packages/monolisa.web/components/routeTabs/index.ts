import { ReactNode } from 'react'

import RouteTabs from './routeTabs'
import AppRouteTabs from './app.routeTabs'
import RepositoryRouteTabs from './job.routeTabs'
import TeamRouteTabs from './team.routeTabs'

export type RouteTabType = {
  value: string
  children: ReactNode
  href: string
  as?: string
  icon?: ReactNode
}

export type RouteTabsType = (options: {
  tabs: Array<RouteTabType>
  className?: string
}) => JSX.Element

export default RouteTabs

export { AppRouteTabs, RepositoryRouteTabs, TeamRouteTabs }
