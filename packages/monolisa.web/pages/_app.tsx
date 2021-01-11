import React, { Fragment } from 'react'
import App from 'next/app'
import Cookies from 'js-cookie'

// import { ThemeContextProvider, themeType } from '../contexts/themeContext'
import { css, Global } from '@emotion/react'
import { getBaseStyles } from '../components/styles'
import { RecoilRoot } from 'recoil'
import { themeType } from '../hooks/useThemeContext'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const theme = (Cookies.get('theme') || 'dark') as themeType

    return (
      <RecoilRoot>
        <Fragment>
          <Global
            styles={css`
              ${getBaseStyles()}
            `}
          />
          <Component {...pageProps} />
        </Fragment>
      </RecoilRoot>
    )
  }
}

export default MyApp
