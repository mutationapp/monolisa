import {
  defaultTeamSize,
  partners,
  teamType,
  unlimitedTeamSize,
} from 'monolisa.model'
import { updateTeamType } from '.'

const updateTeam: updateTeamType = context => ({ getTeam }) => async (
  team: teamType,
) => {
  const { id, slug, reviewComments } = team

  if (!id || !slug) {
    console.error('REQUIRED:', {
      id,
      slug,
    })
    return
  }

  const current = await getTeam({ id })
  if (!current) {
    console.error('EMPTY:', {
      team: current,
    })
    return
  }

  const size = (() => {
    if (team.size) {
      return team.size
    }

    return partners.includes(slug) ? unlimitedTeamSize : defaultTeamSize
  })()

  await context.table<teamType>('teams').update({
    ...current,
    slug: slug || current.slug,
    reviewComments: reviewComments ?? current.reviewComments,
    size,
  })

  return await getTeam({ id })
}

export default updateTeam
