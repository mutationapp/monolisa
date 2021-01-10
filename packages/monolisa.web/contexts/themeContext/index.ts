import { HeaderKindType } from '../../typography'
import { ThemeContextProvider, ThemeContext } from './themeContext'

export type setThemeType = (theme: themeType) => void

export type themeContextType = {
  theme: themeType
  setTheme: setThemeType
  toggleTheme: () => themeType | undefined
  containerWidth?: number
  minWidth?: number
  uFrame: (
    kind?: HeaderKindType,
  ) => {
    bit?: number
    fontSize?: number
    h1?: {
      fontSize: number
    }
  }
}

export type themeType = 'dark' | 'light'

export const otherTheme = (theme: themeType) =>
  theme === 'dark' ? 'light' : 'dark'

export { ThemeContextProvider, ThemeContext }
