import React, { Fragment } from 'react'
import App from 'next/app'
import Cookies from 'js-cookie'

import { ThemeContextProvider, themeType } from '../contexts/themeContext'
import { css, Global } from '@emotion/react'
import { getBaseStyles } from '../components/styles'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const theme = (Cookies.get('theme') || 'dark') as themeType

    return (
      <Fragment>
        <Global
          styles={css`
            ${getBaseStyles()}
          `}
        />
        <ThemeContextProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </Fragment>
    )
  }
}

export default MyApp
