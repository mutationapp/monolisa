// https://github.com/zeit/styled-jsx#global-styles

export default () => `
  // ---RESET---

  /* http://meyerweb.com/eric/tools/css/reset/ 
      v2.0 | 20110126
      License: none (public domain)
  */
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  // ---MONOLISA---

  @font-face {
    font-family: 'Uber Move Text Regular';
    font-style: normal;
    font-weight: normal;
    src: url('/static/fonts/move/uberMoveText.regular.woff');
  }

  @font-face {
    font-family: 'Uber Move Text Medium';
    font-style: normal;
    font-weight: normal;
    src: url('/static/fonts/move/uberMoveText.medium.woff');
  }

  @font-face {
    font-family: 'Uber Move Regular';
    font-style: normal;
    font-weight: normal;
    src: url('/static/fonts/move/uberMove.regular.woff');
  }

  @font-face {
    font-family: 'Uber Move Medium';
    font-style: normal;
    font-weight: normal;
    src: url('/static/fonts/move/uberMove.medium.woff');
  }

  /* https://themer.dev/ */
  :root {
    --foreground: #000;
    --background: #fff;

    --accent-0: #dd2f2f;
    --accent-1: #f5a623;
    --accent-2: #97f646;
    --accent-3: #79c638;
    --accent-4: #58aa11;
    --accent-5: #4697f6;
    --accent-6: #197ef4;
    --accent-7: #f832e7;
    --accent-8: #863dcf;

    --shade-1: #fafafa;
    --shade-2: #eaeaea;
    --shade-3: #999;
    --shade-4: #888;
    --shade-5: #666;
    --shade-6: #444;
    --shade-7: #333;
    --shade-8: #111;

    --selection: var(--accent-2);
    --link-color: var(--accent-6);

    --secondary-light: var(--shade-3);
    --secondary: var(--shade-5);
    --secondary-dark: var(--shade-7);

    --shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    --portal-opacity: 0.25;
  }


  html.dark, .html.dark {
    --foreground: #fff;
    --background: #000;

    --shade-8: #fafafa;
    --shade-7: #eaeaea;
    --shade-6: #999;
    --shade-5: #888;
    --shade-4: #666;
    --shade-3: #444;
    --shade-2: #333;
    --shade-1: #111;
    --selection: var(--accent-7);
  }

  :root {
    --breakpoint-mobile: 600px;
    --breakpoint-tablet: 960px;
    --radius: 0;
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    --font-mono: Menlo, 'Roboto Mono', Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;

    --font-header-regular: 'Uber Move Regular';
    --font-header-medium: 'Uber Move Medium';
    --font-text-regular: 'Uber Move Text Regular';
    --font-text-medium: 'Uber Move Text Medium';
  }

  html, .html,
  body, .body {
    background-color: var(--background);
  }

  body, .body {
    color: var(--foreground);
    font-family: var(--font-text-medium);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    height: 100vh;
    line-height: 1.5;
  }

  pre,
  code {
    font-family: var(--font-mono);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-header-medium);
  }

  a {
    text-decoration: none;
    color: var(--link-color);
  }
  
  .invert {
    background-color: var(--foreground);
    color: var(--background);
  }

  ::selection {
    background: var(--selection);
  }
  ::-moz-selection {
    background: var(--selection);
  }
`
