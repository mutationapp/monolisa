import { getEnv } from 'monolisa.lib/env'

const { GITHUB_CLIENT_ID, MONOLISA_ENV, GITHUB_APP_NAME } = getEnv()

/*
  Setting a custom build directory
  https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory
  module.exports = {
    distDir: 'build',
  }
*/
export default {
  env: {
    GITHUB_CLIENT_ID,
    MONOLISA_ENV,
    GITHUB_APP_NAME,
  },
  publicRuntimeConfig: {
    GITHUB_CLIENT_ID,
    MONOLISA_ENV,
    GITHUB_APP_NAME,
  },
  // webpack: (config, { defaultLoaders }) => {
  //   config.module.rules.push({
  //     test: /\.tsx?$/,
  //     use: [
  //       defaultLoaders.babel,
  //       {
  //         loader: 'babel-loader',
  //       },
  //     ],
  //   })

  //   return config
  // },
}
