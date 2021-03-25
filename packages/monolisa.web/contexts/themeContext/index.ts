import { ThemeContextProvider, ThemeContext } from './themeContext'
import { themeType, iconViewOptionType } from '../../server/shared/themes'

export type setThemeType = (theme: themeType) => void
export type setIconType = (icon: iconViewOptionType) => void

export type themeContextType = {
  routeTabIcons: iconViewOptionType
  theme: themeType
  setTheme: setThemeType
  toggleRouteTabIcons: () => iconViewOptionType | undefined
  toggleTheme: () => themeType | undefined
}

export { ThemeContextProvider, ThemeContext }
