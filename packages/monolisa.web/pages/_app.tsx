import nextCookie from 'next-cookies'
import featureToggles from '../server/shared/featureToggles'
import React, { Fragment } from 'react'
import App, { AppContext } from 'next/app'

import { pageView } from '../analytics'
import { themeType, iconViewOptionType } from '../server/shared/themes'
import { Router } from 'next/router'
import { setAppLoading } from '../hooks/useLoading'
import { resetStyles, htmlStyles, nprogressStyles } from '../styles'

import {
  ThemeContextProvider,
  FeatureToggleContextProvider,
  AppContextProvider,
} from '../contexts'

import withContext, {
  withContextPayloadType,
} from '../server/shared/withContext'

class MyApp extends App<{
  theme: themeType
  routeTabIcons: iconViewOptionType
  context: withContextPayloadType
}> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const { theme, routeTabIcons } = nextCookie(ctx)
    const request = ctx.req

    const context = request ? withContext({ request }).get() : {}

    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
      theme,
      routeTabIcons,
      context,
    }
  }

  handleRouteChangeStart = () => {
    setAppLoading(true)
  }

  handleRouteChangeEnd = (url: string) => {
    setAppLoading(false)
    pageView(url)
  }

  componentDidMount() {
    ;['routeChangeComplete', 'routeChangeError'].forEach(e => {
      Router.events.on(e, this.handleRouteChangeEnd)
    })
    Router.events.on('routeChangeStart', this.handleRouteChangeStart)
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChangeStart)
    ;['routeChangeComplete', 'routeChangeError'].forEach(e => {
      Router.events.off(e, this.handleRouteChangeEnd)
    })
  }
  render() {
    const { Component, pageProps, theme, context, routeTabIcons } = this.props

    return (
      <Fragment>
        <style jsx global>
          {resetStyles}
        </style>
        <style jsx global>
          {htmlStyles}
        </style>
        <style jsx global>
          {nprogressStyles}
        </style>
        <ThemeContextProvider theme={theme} routeTabIcons={routeTabIcons}>
          <AppContextProvider context={context}>
            <FeatureToggleContextProvider featureToggles={featureToggles}>
              <Component {...pageProps} />
            </FeatureToggleContextProvider>
          </AppContextProvider>
        </ThemeContextProvider>
      </Fragment>
    )
  }
}

export default MyApp
