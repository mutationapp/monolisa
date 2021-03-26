import { ReactNode } from 'react'

import RouteTabs from './routeTabs'
import AppRouteTabs from './app.routeTabs'
import RepositoryRouteTabs from './job.routeTabs'
import TeamRouteTabs from './team.routeTabs'

export type RouteTabsType = (options: {
  tabs: Array<{
    value: string
    children: ReactNode
    href: string
    as?: string
    icon?: ReactNode
  }>
  className?: string
}) => JSX.Element

export default RouteTabs

export { AppRouteTabs, RepositoryRouteTabs, TeamRouteTabs }
