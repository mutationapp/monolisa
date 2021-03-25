import { date, lorem, company } from 'faker'
import { randomEmoji } from './emoji'
import { v4 as uuid } from 'uuid'

const listings = [
  {
    id: uuid(),
    content: '**Thus Spoke Zarathustra**',
    createdDate: date.past(),
    company: {
      slug: 'diplomaticTechno',
      picture: randomEmoji(),
    },
  },
  {
    id: uuid(),
    createdDate: date.past(),
    content:
      'As a **Senior** WordPress Developer, at -Awesome- Motive, you’ll join the WPFormsteam where you will collaborate with awesome team members and tackle a wide range of responsibilities.',
    company: {
      slug: 'diplomaticTechno',
      picture: '🍇',
    },
  },
  ...new Array(20).fill(1).map(() => {
    return {
      id: uuid(),
      createdDate: date.past(),
      content: lorem.paragraph(),

      company: {
        slug: company.companyName(),
        picture: randomEmoji(),
      },
    }
  }),
].sort(x => x.createdDate.getMilliseconds())

export { listings as default }
