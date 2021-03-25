export type themeType = 'dark' | 'light'
export type iconViewOptionType = 'show' | 'hide'

export const otherTheme = (theme: themeType) =>
  theme === 'dark' ? 'light' : 'dark'
export const otherIconViewOption = (option: iconViewOptionType) =>
  option === 'show' ? 'hide' : 'show'
