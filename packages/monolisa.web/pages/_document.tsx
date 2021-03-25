import Document, { Head, Main, NextScript, Html } from 'next/document'
import nextCookie from 'next-cookies'
import { GA_TRACKING_ID } from '../analytics'
import { NewRelic } from '../components'
import flushToReact from 'styled-jsx/server'
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { theme } = nextCookie(ctx)
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, theme }
  }
  render() {
    return (
      <Html
        lang="en"
        data-version="(▀̿Ĺ̯▀̿ ̿)"
        className={this.props['theme'] || 'dark'}
      >
        <Head>
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,600;1,400;1,600&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          {flushToReact()}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <NewRelic />
        </Head>
        <body>
          <Main />
          <div id="modalPortal"></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}
