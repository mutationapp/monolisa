import { defaultTeamSize } from 'monolisa.model'

export const run = f => f()

export const dealWithIt = (value?: string) =>
  value ? `${value} (▀̿Ĺ̯▀̿ ̿).` : '(▀̿Ĺ̯▀̿ ̿)'

export const maskWithIt = (mask = '*****') => dealWithIt(mask)

export const getContactEmail = (mailto: boolean) =>
  `${mailto ? 'mailto://' : ''}contact@monolisa.app`

export const nothingHereYet = '? Nothing here yet'

export const somethingWentWrong = dealWithIt('Something went wrong')

export const weAreTrackingIssueForYou = 'We are tracking the issue for you.'

export const betaTesting = `β: monolisa.app is free for individuals and free up to ${defaultTeamSize} seats for teams 🙌`
