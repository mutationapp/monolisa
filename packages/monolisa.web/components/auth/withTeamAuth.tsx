import { getTeamUrl } from '../../server/shared'
import { Redirect } from '..'
import { isOwner } from 'monolisa.model'
import { useAppContext } from '../../hooks'

const withTeamAuth = WrappedComponent => {
  const Wrapper = props => {
    const { team } = useAppContext()
    const teamMember = team?.teamMember

    if (!teamMember) {
      return <Redirect href="/" />
    }

    if (!isOwner(teamMember)) {
      return <Redirect {...getTeamUrl(teamMember.teamSlug)('repositories')} />
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withTeamAuth
