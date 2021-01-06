import Button from './button'
import { linkType } from '../link'
import { ReactNode } from 'react'
import { HeaderKindType } from '../header'

export type ButtonType =
  | 'secondary'
  | 'primary'
  | 'ghost'
  | 'success'
  | 'error'
  | 'warning'

export type ButtonPropsType = {
  of: HeaderKindType
  link?: linkType
  type?: ButtonType
  transparent?: boolean
  className?: string
  disabled?: boolean
  processing?: boolean
  secondary?: boolean
  size?: 'small' | 'medium' | 'large'
  icon?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export default Button
