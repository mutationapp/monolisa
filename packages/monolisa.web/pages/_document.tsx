import Document, { Html, Head, Main, NextScript } from 'next/document'
import Cookies from 'js-cookie'

import { extractCritical } from '@emotion/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  render() {
    const theme = Cookies.get('theme')

    return (
      <Html className={theme || 'dark'}>
        <Head>
          <style
            data-emotion-css={this.props['ids'].join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props['css'] }}
          />
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
