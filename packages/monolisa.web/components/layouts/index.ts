import DashboardLayout from './dashboard.layout'
import { memberType } from 'monolisa.model'
import MainLayout from './main.layout'

export type WithMember = React.FunctionComponent<{ member: memberType }>

export { MainLayout, DashboardLayout }
