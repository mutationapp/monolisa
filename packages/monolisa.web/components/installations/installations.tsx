import { useLoading, useProfile, useTeam, useAppContext } from '../../hooks'

import { Error, Loading, Installation } from '..'
import { MainLayout } from '../layouts'
import { run, somethingWentWrong } from 'monolisa.lib'
import SomethingWentWrong from '../somethingWentWrong'

const Installations = () => {
  const { team, user, member } = useAppContext()

  if (!team && !user) {
    return <Error statusCode={404} />
  }

  const teamSlug = team?.name

  const { data, error } = teamSlug
    ? useTeam(teamSlug)
    : user
    ? useProfile(user.slug)
    : {
        data: null,
        error: somethingWentWrong,
      }

  const loading = useLoading(!error && !data)

  return (
    <MainLayout
      pageTitle={`${teamSlug || user?.slug} : Installations`}
      pull
      title={`${
        teamSlug ? 'Team' : member?.id === user?.id ? 'Your' : 'User'
      } installations`}
      aside={' '}
    >
      <div>
        {run(() => {
          if (error) {
            return <SomethingWentWrong />
          }
          if (loading) {
            return <Loading box />
          }

          return <Installation installations={data?.installations} />
        })}
      </div>
    </MainLayout>
  )
}
export default Installations
