import { Application } from 'express'
import { getImport, getInstallation } from 'monolisa.data'
import { tokenize } from 'monolisa.model'
import { invalid, ok, notFound } from 'monolisa.lib/api'

export default (server: Application) => {
  server.put('/', async (request, response) => {
    const key = request.body.key
    if (!key) {
      return invalid(response, {
        error: "'key' is missing.",
        data: { key },
      })
    }

    const imprt = await getImport({ key })
    if (!imprt) {
      return notFound(response, {
        error: 'Import not found.',
        data: { key },
      })
    }

    const installation = await getInstallation({
      id: imprt.installationId,
      login: imprt.owner,
    })

    if (!installation) {
      return notFound(response, {
        error: 'Installation not found.',
        data: { key },
      })
    }

    // const owner = request.body.owner?.trim()
    // if (!owner) {
    //   return invalid(response, {
    //     error: "'owner' is missing.",
    //     data: { owner },
    //   })
    // }

    return ok(response, tokenize.signRepository(key))
  })
}
