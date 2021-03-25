import { Application } from 'express'

export default (server: Application) => {
  server.get('/', (_, res) => {
    res.send('(▀̿Ĺ̯▀̿ ̿)')
  })
}
