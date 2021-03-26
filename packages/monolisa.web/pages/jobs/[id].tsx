import dedent from 'dedent'
import { company, lorem } from 'faker'
import React from 'react'
import { Markdown } from '../../components'
import { DashboardLayout } from '../../components/layouts'
import { randomEmoji } from '../../mock/emoji'

const Job = () => {
  return (
    <DashboardLayout
      subtitle={company.catchPhrase()}
      heading={<h1>Engineering Manager</h1>}
      aside={' '}
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
    </DashboardLayout>
  )
}

export default Job
