import { createContext, useEffect, useState } from 'react'
import { useCookie } from '../../hooks'
import { setThemeType, themeContextType, themeType, otherTheme } from '.'
import {
  getBit,
  headerKinds,
  HeaderKindType,
  queries,
  scale,
  vectors,
} from '../../typography'

export const ThemeContext = createContext<themeContextType>({
  theme: 'dark',
  setTheme: () => undefined,
  toggleTheme: () => undefined,
  uFrame: () => ({}),
})

export const ThemeContextProvider: React.FunctionComponent<{
  theme: themeType
}> = ({ children, theme: initialTheme }) => {
  const scaled = scale(vectors)({})

  const [themeCookie, setThemeCookie] = useCookie('theme', initialTheme)

  const on = ['resize', 'load']

  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined,
  )

  const handleResize = () => {
    setContainerWidth(window.innerWidth)
  }

  useEffect(() => {
    if (!process.browser) {
      return
    }

    on.forEach(x => window.addEventListener(x, handleResize))
    return () => {
      on.forEach(x => window.removeEventListener(x, handleResize))
    }
  }, [containerWidth])

  const theme = themeCookie as themeType

  const updateHtml = (newTheme: themeType) => {
    const html = document.getElementsByTagName('html')?.[0]
    if (!html) return

    const htmlClasses = html.classList
    htmlClasses.add(newTheme)
  }

  const setTheme: setThemeType = newTheme => {
    updateHtml(newTheme)
    setThemeCookie(newTheme)
  }

  const toggleTheme = () => {
    const toggled = otherTheme(theme)
    setTheme(toggled)

    return toggled
  }

  const minWidth = containerWidth
    ? queries.reduce((a, b) => {
        return Math.abs(b - containerWidth) < Math.abs(a - containerWidth)
          ? b
          : a
      })
    : undefined

  const current = queries.indexOf(minWidth as number)

  const uFrame = (kind?: HeaderKindType) => {
    const x = Object.keys(headerKinds).reduce((acc, item) => {
      return {
        ...acc,
        [item]: { fontSize: scaled[item]?.fontSize?.[current] },
      }
    }, {})

    return {
      bit: getBit(kind)?.fontSize[current],
      fontSize: getBit('h1')?.fontSize,
      ...x,
    }
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    containerWidth,
    minWidth,
    uFrame,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
