import Button from '../button'
import { getConfirmationType, WizardActionType, firstConirmationType } from '.'
import { ReactNode } from 'react'

export const getConfirmation: getConfirmationType = ({
  title,
  confirm,
  cancel,
  next,
  onConfirm,
  processing,
  ...rest
} = {}) => {
  const first = rest.first || 'confirm'

  return {
    children: title || 'Are you sure?',
    actions: [
      {
        children: (
          <Button
            processing={processing}
            secondary={first === 'confirm'}
            size="small"
          >
            {confirm || 'Yes'}
          </Button>
        ),
        key: 'confirm',
        next: next?.() || onConfirm,
      },
      {
        children: (
          <Button
            secondary={first === 'cancel'}
            processing={processing}
            size="small"
          >
            {cancel || 'cancel'}
          </Button>
        ),
        key: 'cancel',
      },
    ].sort(x => (first === x.key ? -1 : 1)),
  }
}

export type withConfirmationType = (props: {
  confirm?: string
  processing?: boolean
  onConfirm?: () => Promise<void>
  key: string
  cancel?: string
  title: string
  confirmTitle?: string | ReactNode
  icon?: ReactNode
  first?: firstConirmationType
}) => WizardActionType

export const withConfirmation: withConfirmationType = ({
  title,
  confirm,
  cancel,
  onConfirm,
  confirmTitle,
  key,
  processing,
  icon,
  first,
}) => {
  return {
    children: (
      <Button icon={icon} processing={processing} secondary size="small">
        {title || 'Save'}
      </Button>
    ),
    key,
    next: getConfirmation({
      title: confirmTitle || 'Are you sure',
      cancel: cancel || 'cancel',
      confirm: confirm || 'confirm',
      onConfirm,
      processing,
      first,
    }),
  }
}
