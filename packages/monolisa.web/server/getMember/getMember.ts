import { memberType } from 'monolisa.model'

const getMember = ctx => {
  const request = ctx.request || ctx.req
  return request?.['member'] as memberType | undefined
}

export default getMember
