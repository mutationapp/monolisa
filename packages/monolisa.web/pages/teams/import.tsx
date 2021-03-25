import { Import } from '../../components'
import withTeamAuth from '../../components/auth/withTeamAuth'

const TeamImport = () => {
  return <Import />
}

export default withTeamAuth(TeamImport)
