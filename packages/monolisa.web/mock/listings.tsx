import { date, lorem, company } from 'faker'
import { randomEmoji } from './emoji'
import { v4 as uuid } from 'uuid'

const listings = [
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
