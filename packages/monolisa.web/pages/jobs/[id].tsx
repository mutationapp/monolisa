import { company } from 'faker'
import { useRouter } from 'next/router'
import React from 'react'
import { Markdown } from '../../components'
import { MainLayout } from '../../components/layouts'
import { useJob } from '../../hooks'

const Job = () => {
  const { query } = useRouter()

  const id = query.id as string

  const { data } = useJob({ id })

  const job = data?.job
  const team = data?.team

  if (!job || !team) {
    return 'Not Found'
  }

  return (
    <MainLayout subtitle={company.catchPhrase()} title={'Engineering Manager'}>
      <Markdown>{job.details}</Markdown>
    </MainLayout>
  )
}

export default Job
