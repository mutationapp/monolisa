import { Button } from '..'
import { BoxIcon } from '../icons'
import { getTeamUrl } from '../../server/shared'
import { isOwner } from 'monolisa.model'
import { useAppContext } from '../../hooks'
import getUrl from '../../server/shared/getUrl'

const ImportRepositoryButton = () => {
  const { member, team } = useAppContext()

  const teamMember = team?.teamMember
  const isTeamGuest = team && !teamMember

  const installation = member?.installations?.find(
    i => i.provider === 'github' && (!team || i.teamId === team?.id),
  )

  if (!member || (teamMember && !isOwner(teamMember))) {
    return null
  }

  if (isTeamGuest) {
    return (
      <Button
        size="large"
        link={{
          href: '/teams/new',
        }}
        className="provider"
        icon={<BoxIcon />}
      >
        Install company
      </Button>
    )
  }

  if (!installation) {
    return null
  }

  return teamMember ? (
    <Button link={getTeamUrl(teamMember.teamSlug)('import')} size="large">
      Import Repository
    </Button>
  ) : (
    <Button link={getUrl(member.slug)('import')} size="large">
      Import Repository
    </Button>
  )
}

export default ImportRepositoryButton
