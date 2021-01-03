import { TypographyType } from '../../typography'
import Header from './header'

export const headerKinds = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
}

export type HeaderKindType = keyof typeof headerKinds

export const headerTypography: TypographyType = [
  [4.8, 3.6, 2.2, 1.8, 1.8, 1.4],
  [9.6, 4.8, 3.7, 2.4, 2.4, 1.6],
  [12.8, 6.4, 4, 3.2, 2.4, 1.8],
  [14.4, 7.2, 4.5, 3.6, 2.4, 1.8],
  [18, 9, 5.6, 4.5, 3, 2.2],
]

export default Header
