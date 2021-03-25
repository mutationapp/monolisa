import { truncate } from 'monolisa.lib/utils/string'

export const trimCommitNumber = (number: string) => truncate(4)(number)
