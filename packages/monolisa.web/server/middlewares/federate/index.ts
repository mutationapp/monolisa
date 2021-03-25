import federate from './federate'
import { RequestHandler } from 'express'
import { NextServer } from 'next/dist/server/next'

export type federateType = (app: NextServer, queryKey: string) => RequestHandler

export default federate
