import { createContext, useEffect, useState } from 'react'
import { useCookie } from '../../hooks'
import { setThemeType, themeContextType, themeType, otherTheme } from '.'
import { getBit, headerKinds, queries, scale, vectors } from '../../typography'
import { atom, useRecoilState } from 'recoil'

export const themeState = atom<themeContextType>({
  key: 'themeState', // unique ID (with respect to other atoms/selectors)
  default: {
    theme: 'dark',
    setTheme: () => undefined,
    toggleTheme: () => undefined,
    uFrame: {},
  },
})

const useThemeContext = () => {
  const [state, setState] = useRecoilState<themeContextType>(themeState)

  const scaled = scale(vectors)({})

  const [themeCookie, setThemeCookie] = useCookie('theme', 'dark')

  const on = ['resize', 'load']

  const [containerWidth, setContainerWidth] = useState<number | undefined>()

  const handleLoad = () => {
    const w = window.innerWidth

    setContainerWidth(window.innerWidth)
  }

  useEffect(() => {
    if (!process.browser) {
      return
    }

    // if (!containerWidth) return

    const minWidth = containerWidth
      ? queries.reduce((a, b) => {
          return Math.abs(b - containerWidth) > Math.abs(a - containerWidth)
            ? a
            : b
        })
      : undefined

    // const currentIndex = minWidth
    //   ? queries.indexOf(minWidth as number)
    //   : undefined

    const current = queries.indexOf(minWidth as number)
    const bit =
      parseInt(getBit('h3')?.fontSize[current]?.replace('px', '')) || 0

    const withHeaderKinds = Object.keys(headerKinds).reduce((acc, item) => {
      return {
        ...acc,
        [item]: { fontSize: scaled[item]?.fontSize?.[current] },
      }
    }, {})

    const uFrame = (() => {
      return {
        bit,
        fontSize: getBit('h1')?.fontSize,
        ...withHeaderKinds,
        containerWidth,
        minWidth:
          minWidth && containerWidth && bit
            ? Math.min(containerWidth, minWidth) - bit * 4
            : undefined,
        width:
          minWidth && containerWidth && containerWidth < minWidth
            ? queries[current - 1]
            : minWidth,
      }
    })()

    setState({
      ...state,
      theme,
      setTheme,
      toggleTheme,
      containerWidth,
      minWidth,
      uFrame,
    })

    on.forEach(x => window.addEventListener(x, handleLoad))
    return () => {
      on.forEach(x => window.removeEventListener(x, handleLoad))
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

  useEffect(() => {
    const minWidth = containerWidth
      ? queries.reduce((a, b) => {
          return Math.abs(b - containerWidth) < Math.abs(a - containerWidth)
            ? b
            : a
        })
      : undefined

    const current = queries.indexOf(minWidth as number)

    const withHeaderKinds = Object.keys(headerKinds).reduce((acc, item) => {
      return {
        ...acc,
        [item]: { fontSize: scaled[item]?.fontSize?.[current] },
      }
    }, {})

    const uFrame = (() => {
      const bit =
        parseInt(getBit('h3')?.fontSize[current]?.replace('px', '')) || 0

      return {
        bit,
        fontSize: getBit('h1')?.fontSize,
        ...withHeaderKinds,
        width:
          minWidth && containerWidth && containerWidth < minWidth
            ? queries[current - 1]
            : minWidth,
      }
    })()

    const value = {
      theme,
      setTheme,
      toggleTheme,
      containerWidth,
      minWidth,
      uFrame,
    }
  }, [containerWidth])
  return state
}

export default useThemeContext
