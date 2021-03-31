import faker from 'faker'
import {
  getIntegration,
  getTeam,
  getUser,
  saveTeam,
  saveUser,
} from 'monolisa.data'
import { encrypt } from 'monolisa.lib/rsa'
import { integrationProviderType, teamBaseType } from 'monolisa.model'
import { v4 as uuid } from 'uuid'

export type userStubType = {
  providerUserId: string
  userName: string
  provider: integrationProviderType
  email: string
  name: string
  accessToken: string
  //   team?: typeof mutationLab
}

export const users: {
  [key: string]: userStubType
} = {
  ibsukru: {
    // accessToken: INTEGRATION_API_KEY,
    accessToken: uuid(),
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

const teams = {
  mutationApp: {
    slug: 'mutationapp',
  },
}

const getStub = () =>
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

      const team: teamBaseType = {
        slug: `${userCard.username}-team`,
      }
      return { user, team }
    })
    .concat({
      user: users.ibsukru,
      team: teams.mutationApp,
    })

test.each(getStub())('Integrate', async current => {
  const { name, email, userName: slug } = current.user

  const t = await getIntegration({ accessToken: encrypt(uuid()) })
  console.log(`🚀 ~ file: monolisa.integration.ts ~ line 88 ~ test.each ~ t`, t)

  const teamPayload = current.team

  const user =
    (await getUser({ slug })) || (await saveUser({ name, email, slug }))

  if (!user) {
    expect(user).toBeTruthy()
    return
  }
  //   const team =
  await (async () => {
    if (!current.team) {
      return
    }

    const { slug } = teamPayload

    const item =
      (await getTeam({ slug })) ||
      (await saveTeam({ slug, createdBy: user.id }))

    expect(item).toBeTruthy()

    return item
  })()

  //   if (!saved) {
  //     expect(saved).toBeTruthy()
  //   }
})
