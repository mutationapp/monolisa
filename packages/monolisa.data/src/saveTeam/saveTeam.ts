import { saveTeamType } from '.'
import {
  defaultTeamSize,
  partners,
  teamType,
  unlimitedTeamSize,
} from 'monolisa.model'
import { withQuery } from '../utils'
import { v4 as uuid } from 'uuid'
import { DbValidationError } from 'monolisa.lib/error'

const saveTeam: saveTeamType = context => ({
  getTeam,
  saveUserTeam,
}) => async team => {
  const { slug, createdBy, reviewComments } = team
  if (!slug) {
    console.error('REQUIRED:', {
      slug,
      createdBy,
    })
    return
  }

  if (await getTeam({ slug })) {
    throw new DbValidationError(`Team with slug: "${slug}" already exist.`, {
      name,
    })
  }

  const id = uuid()

  const getTeamsQuery = withQuery<teamType>(context)('teams')

  const size = (() => {
    if (team.size) {
      return team.size
    }

    return partners.includes(slug) ? unlimitedTeamSize : defaultTeamSize
  })()

  await getTeamsQuery().insert({
    id,
    slug,
    createdBy,
    invitationKey: uuid(),
    size,
    reviewComments: reviewComments ?? true,
  })

  await saveUserTeam({
    userId: createdBy,
    teamId: id,
    role: 'Owner',
  })

  return await getTeamsQuery().where('id', id).first<teamType>()
}

export default saveTeam
