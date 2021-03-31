import dedent from 'dedent'
import { lorem, helpers } from 'faker'
import React from 'react'
import { Markdown } from '../components'
import { MainLayout } from '../components/layouts'
import { randomEmoji } from '../mock/emoji'

const Job = () => {
  const userCard = helpers.userCard()

  return (
    <MainLayout subtitle={userCard.company.catchPhrase} title={userCard.name}>
      <Markdown>
        {dedent`
          ${lorem.paragraph()}

          ${lorem.paragraph()}
          
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          * ${randomEmoji()} ${lorem.sentence()}
          
          ${lorem.paragraph()}
          ${lorem.paragraph()}
        `}
      </Markdown>
    </MainLayout>
  )
}

export default Job
