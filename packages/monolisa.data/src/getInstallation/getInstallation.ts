import { getInstallationType } from '.'

export const getInstallation: getInstallationType = ({
  getInstallations,
}) => async payload => {
  return (await getInstallations(payload))?.[0]
}

export default getInstallation
