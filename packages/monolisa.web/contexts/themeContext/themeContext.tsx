import { createContext } from 'react'
import { useCookie } from '../../hooks'
import { setThemeType, themeContextType, setIconType } from '.'

import {
  themeType,
  otherTheme,
  iconViewOptionType,
  otherIconViewOption,
} from '../../server/shared/themes'

export const ThemeContext = createContext<themeContextType>({
  theme: 'dark',
  routeTabIcons: 'show',
  toggleRouteTabIcons: () => undefined,
  setTheme: () => undefined,
  toggleTheme: () => undefined,
})

export const ThemeContextProvider: React.FunctionComponent<{
  theme: themeType
  routeTabIcons: iconViewOptionType
}> = ({
  children,
  theme: initialTheme,
  routeTabIcons: initialRouteTabIcons,
}) => {
  const [themeCookie, setThemeCookie] = useCookie('theme', initialTheme)
  const [routeTabIconsCookie, setRouteTabIconsCookie] = useCookie(
    'routeTabIcons',
    initialRouteTabIcons,
  )

  const routeTabIcons = routeTabIconsCookie as iconViewOptionType
  const theme = themeCookie as themeType

  const updateHtml = (newTheme: themeType) => {
    const html = document.getElementsByTagName('html')?.[0]
    if (!html) return

    const htmlClasses = html.classList
    htmlClasses.remove(otherTheme(newTheme))
    htmlClasses.add(newTheme)
  }

  const setTheme: setThemeType = newTheme => {
    updateHtml(newTheme)
    setThemeCookie(newTheme)
  }

  const setRouteTabIcon: setIconType = icon => {
    setRouteTabIconsCookie(icon)
  }

  const toggleTheme = () => {
    const toggled = otherTheme(theme)
    setTheme(toggled)

    return toggled
  }

  const toggleRouteTabIcons = () => {
    const toggled = otherIconViewOption(routeTabIcons)
    setRouteTabIcon(toggled)

    return toggled
  }

  const value = {
    routeTabIcons,
    theme,
    setTheme,
    toggleRouteTabIcons,
    toggleTheme,
  }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
