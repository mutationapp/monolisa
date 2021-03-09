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
import { atom, useRecoilState } from 'recoil'
import config, {
  configType,
  reducedConfigType,
} from '../../components/frame/config'

function throttle(func: Function, limit: number): Function {
  let inThrottle: boolean

  return function (this: any): any {
    const args = arguments
    const context = this

    if (!inThrottle) {
      inThrottle = true
      func.apply(context, args)
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const themeState = atom<themeContextType>({
  key: 'themeState', // unique ID (with respect to other atoms/selectors)
  default: {
    theme: 'dark',
    setTheme: () => undefined,
    toggleTheme: () => undefined,
    bit: 37,
    minWidth: 1800,
    width: 1680 - 2 * 32,
    containerWidth: 1680,
    fontSize: 56,
    h1: {
      fontSize: 56,
    },
    currentIndex: 6,
  },
})

export const getMeta = (currentIndex: number) => (name: string) => (payload: {
  startTime: string
}): reducedConfigType | undefined => {
  const currentItem = config[name][payload.startTime]
  const defaultConfig = config[name]['defaults']

  const values = currentItem || defaultConfig
  if (!values) return

  const defaultValues = Object.entries(defaultConfig).reduce(
    (acc, [key, value]) => {
      if (!value) return acc

      const [item] = value.length === 1 ? value : [value[currentIndex]]

      return {
        ...acc,
        [key]: item,
      }
    },
    {},
  )

  return {
    ...Object.entries(values).reduce<reducedConfigType>((acc, [key, value]) => {
      if (!value) return acc
      const [item] = value.length === 1 ? value : [value[currentIndex]]

      return {
        ...acc,
        [key]: item,
      }
    }, {} as reducedConfigType),
    ...Object.entries(values).reduce<reducedConfigType>((acc, [key, value]) => {
      if (!value) return acc
      const [item] = value.length === 1 ? value : [value[currentIndex]]

      return {
        ...acc,
        [key]: item,
      }
    }, {} as reducedConfigType),
  }
}

export const themeContextDefaults = {
  bit: 37,
  containerWidth: 1680,
  width: 1600,
}

const useThemeContext = (
  props: { bit: number; containerWidth: number } = themeContextDefaults,
) => {
  const [state, setState] = useRecoilState<themeContextType>(themeState)

  const scaled = scale(vectors)({})

  const [themeCookie, setThemeCookie] = useCookie('theme', 'dark')

  const on = ['resize', 'load']

  const [containerWidth, setContainerWidth] = useState<number>(
    props.containerWidth,
  )

  const handleLoad = throttle(() => {
    const w = window.innerWidth

    setContainerWidth(window.innerWidth)
  }, 50)

  useEffect(() => {
    if (!process.browser) {
      return
    }

    const minWidth = queries.reduce((a, b) => {
      return Math.abs(b - containerWidth) > Math.abs(a - containerWidth) ? a : b
    })

    const currentIndex = queries.indexOf(minWidth)

    const getBit = (kind: HeaderKindType = 'h1') =>
      scale(vectors)({
        ratio: 2 / 3,
      })?.[kind]

    const bit = parseInt(
      getBit('h3')?.fontSize[currentIndex]?.replace('px', ''),
    )

    const previousQuery = queries[currentIndex - 1]

    setState({
      ...state,
      ...Object.keys(headerKinds).reduce((acc, item) => {
        return {
          ...acc,
          [item]: { fontSize: scaled[item]?.fontSize?.[currentIndex] },
        }
      }, {}),
      theme,
      setTheme,
      toggleTheme,
      containerWidth,
      minWidth,
      currentIndex,
      bit,
      fontSize: getBit('h1')?.fontSize,
      width:
        previousQuery && minWidth > containerWidth
          ? previousQuery
          : minWidth - bit,
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

  return { ...state, getMeta: getMeta(state.currentIndex) }
}

export default useThemeContext
