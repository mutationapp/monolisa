export type configEnvType = {
  GITHUB_CLIENT_ID: string
}

export type getConfigType = (
  env: NodeJS.ProcessEnv,
) => {
  GITHUB_AUTHORIZE_URL: string
}

// MAKE IT WORK
export const getConfig: getConfigType = ({ GITHUB_CLIENT_ID }) => {
  return {
    GITHUB_AUTHORIZE_URL: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`,
  }
}
