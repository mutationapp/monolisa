import Knex from 'knex'
import { group } from 'monolisa.lib/utils/array'

export const withQuery = <T>(context: Knex) => (table: string) => () =>
  context.table<T>(table)

export const hasDefinedEntry = (obj: object) =>
  obj ? !Object.values(obj).every(value => value === undefined) : false

export type filterPayloadType<D extends object> = Partial<D> | Partial<D>[]

// http://knexjs.org/
export const filter = <T extends object>(context: Knex) => (name: string) => <
  D extends object
>(
  payload: filterPayloadType<D>,
) => {
  const filterBy = (payload instanceof Array ? payload : [payload]).filter(
    Boolean,
  )

  // if (!filterBy.length) {
  //   return
  // }

  const table = context.table<T>(name)

  const grouped = group(filterBy)
  // if (!Object.keys(group).length) {
  //   return table.whereExists()
  // }

  Object.entries(grouped).forEach(([k, v]) => {
    table
      .whereIn(
        [k],
        v.reduce((acc, item) => {
          return acc.concat([[item]])
        }, []),
      )
      .orderBy(k, 'desc')
  })

  return table
}
