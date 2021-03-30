import dedent from 'dedent'
import { company, lorem } from 'faker'
import React from 'react'
import { Markdown } from '../../components'
import { MainLayout } from '../../components/layouts'
import { randomEmoji } from '../../mock/emoji'

const Job = () => {
  return (
    <MainLayout
      subtitle={company.catchPhrase()}
      heading={<h1>Engineering Manager</h1>}
    >
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
