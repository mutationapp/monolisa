import faker from 'faker'
import {
  getTeam,
  getUser,
  saveTeam,
  saveUser,
  saveUserTeam,
} from 'monolisa.data'
import { integrationProviderType } from 'monolisa.model'
import { v4 as uuid } from 'uuid'

export type userStubType = {
  providerUserId: string
  userName: string
  provider: integrationProviderType
  email: string
  name: string
  accessToken: string
}

export const users: {
  [key: string]: userStubType
} = {
  ibsukru: {
    accessToken: '4e2f0e41-f61e-4395-bf09-f72cf4eab82a',
    providerUserId: '1394705',
    userName: 'ibsukru',
    provider: 'github',
    email: 'ibsukru@gmail.com',
    name: 'ibrahim sukru',
  },
  ibvelinov: {
    accessToken: '6f5fd96c30d4fd232e645b28eea9530936e7dbe5',
    providerUserId: '17336276',
    userName: 'ibvelinov',
    provider: 'github',
    email: 'ibvelinov@gmail.com',
    name: 'ibrahim velinov',
  },
  diplomaticTechno: {
    accessToken: 'diplomaticTechno_accessToken',
    providerUserId: '2829280',
    userName: 'diplomaticTechno_',
    provider: 'github',
    email: 'diplomaticTechno@gmail.com',
    name: 'diplomatic techno',
  },
}

type teamStubType = {
  slug: string
  users: string[]
}

const teams = {
  mutationApp: {
    slug: 'mutationapp',
    users: ['ibsukru'],
  },
}

const usersStub = (() =>
  new Array(5)
    .fill(undefined)
    .map(() => {
      const userCard = faker.helpers.userCard()

      const user: userStubType = {
        userName: userCard.username,
        provider: 'github',
        email: userCard.email,
        name: userCard.name,
        accessToken: 'accessToken',
        providerUserId: uuid(),
      }

      return user
    })
    .concat(users.ibsukru))()

const teamsStub = (() => {
  return new Array(3)
    .fill(undefined)
    .map(() => {
      const team: teamStubType = {
        slug: faker.lorem.slug(),
        users: ['ibsukru'],
      }

      return team
    })
    .concat(teams.mutationApp)
})()

// test.each(usersStub)('Integration', async current => {
//   const { name, email, userName: userSlug } = current

//   const user =
//     (await getUser({ slug: userSlug })) ||
//     (await saveUser({ name, email, slug: userSlug }))

//   if (!user) {
//     expect(user).toBeTruthy()
//     return
//   }
// })

test('Integration', async () => {
  await Promise.all(
    usersStub.map(async current => {
      const { name, email, userName: userSlug } = current
      const user =
        (await getUser({ slug: userSlug })) ||
        (await saveUser({ name, email, slug: userSlug }))
      if (!user) {
        expect(user).toBeTruthy()
        return
      }
    }),
  )

  await Promise.all(
    teamsStub.map(async current => {
      const { slug, users } = current
      const user = await getUser({ slug: users[0] })
      if (!user) {
        expect(user).toBeTruthy()
        return
      }
      const team =
        (await getTeam({ slug })) ||
        (await saveTeam({ slug, createdBy: user.id }))

      if (!team) {
        expect(team).toBeTruthy()
        return
      }

      await Promise.all(
        users.map(async userSlug => {
          const currentUser = await getUser({ slug: userSlug })
          if (!currentUser) {
            expect(currentUser).toBeTruthy()
            return
          }
          saveUserTeam({
            userId: currentUser.id,
            teamId: team.id,
            role: 'Owner',
          })
        }),
      )
    }),
  )
})
