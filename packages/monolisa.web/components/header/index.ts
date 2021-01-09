import Header from './header'
import { HeaderKindType, typographyRatioType } from '../../typography'
import PropTypes, { InferProps } from 'prop-types'

export const HeaderPropTypes = {
  text: PropTypes.string,
  marginBottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  kind: PropTypes.oneOf<HeaderKindType>(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  ratio: PropTypes.oneOf<typographyRatioType>(['1', '1/3', '2/3']),
}

export type HeaderType = React.FunctionComponent<
  InferProps<typeof HeaderPropTypes>
>

Header.propTypes = HeaderPropTypes

export default Header
