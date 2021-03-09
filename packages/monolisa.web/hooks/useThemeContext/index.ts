import { HeaderKindType } from '../../typography'
import useThemeContext from './useThemeContext'

export type setThemeType = (theme: themeType) => void

export type themeContextType = {
  theme: themeType
  setTheme: setThemeType
  toggleTheme: () => themeType | undefined
  containerWidth: number
  minWidth: number
  currentIndex: number
  // uFrame: {
  bit: number
  fontSize: number
  h1: {
    fontSize: number
  }
  width: number
  // containerWidth?: number
  // minWidth?: number
  // currentIndex?: number
  // }
}

export type themeType = 'dark' | 'light'

export const otherTheme = (theme: themeType) =>
  theme === 'dark' ? 'light' : 'dark'

export default useThemeContext
