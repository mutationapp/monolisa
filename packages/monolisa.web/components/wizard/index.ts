import { ReactNode } from 'react'
import { ButtonPropsType } from '../button'
import Wizard from './wizard'

export type WizardActionType = {
  children: ButtonPropsType
  key: string
  next?: WizardType | (() => Promise<void>) | undefined
}

export type WizardType = {
  children: ReactNode
  actions?: WizardActionType[]
}

export type firstConirmationType = 'confirm' | 'cancel'

export type getConfirmationType = (props?: {
  processing?: boolean
  next?: () => WizardType
  confirm?: string
  onConfirm?: () => Promise<void>
  cancel?: string
  title?: string | ReactNode
  first?: firstConirmationType
}) => WizardType

export default Wizard
