import compression from 'compression'
import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import fileUpload from 'express-fileupload'
import { dealWithIt } from 'monolisa.lib'
import helmet from 'helmet'

const { INIT_CWD } = process.env
dotenv.config({ path: path.join(INIT_CWD || __dirname, '.env') })

import { post, put, get } from './routes'

const port = process.env.PORT || '4000'

const server = express()
server.use([
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
  compression(),
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
])
;[get, post, put].forEach(route => route(server))

server.listen(port, () => {
  console.info(dealWithIt(`API Ready on http://localhost:${port}`))
})
