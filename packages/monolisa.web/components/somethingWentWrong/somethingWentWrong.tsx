import { Box } from '..'
import { weAreTrackingIssueForYou, somethingWentWrong } from 'monolisa.lib'
import { ReactNode } from 'react'

const SomethingWentWrong: React.FunctionComponent<{
  header?: ReactNode
  footer?: ReactNode
}> = ({ header, footer }) => (
  <Box
    footer={footer || (!header && weAreTrackingIssueForYou)}
    header={header || somethingWentWrong}
  />
)

export default SomethingWentWrong
