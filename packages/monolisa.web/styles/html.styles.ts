// https://github.com/zeit/styled-jsx#global-styles
import css from 'styled-jsx/css'

export default css.global`
  @font-face {
    font-family: 'Uber Move Medium';
    font-style: normal;
    font-weight: normal;
    src: local('Uber Move Medium'),
      url('/static/fonts/UberMoveMedium.woff') format('woff');
  }

  @font-face {
    font-family: 'Uber Move Bold';
    font-style: normal;
    font-weight: normal;
    src: local('Uber Move Bold'),
      url('/static/fonts/UberMoveBold.woff') format('woff');
  }

  * {
    margin: 0;
    padding: 0;
  }

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

  html.dark {
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
    --radius: 10px;
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    --font-mono: 'Roboto Mono', Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }

  html,
  body {
    background-color: var(--background);
    font-size: 10px;
  }

  body {
    color: var(--foreground);
    font-family: 'Uber Move Medium';
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    height: 100vh;
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
  }

  a {
    position: relative;
    text-decoration: none;

    color: var(--link-color);
  }

  button,
  .clickable {
    position: relative;
  }

  .small {
    font-size: 0.875rem;
  }
  .smaller {
    font-size: 0.775rem;
  }
  .smallest {
    font-size: 0.675rem;
  }

  .invert {
    background-color: var(--foreground);
    color: var(--background);
  }

  button:active,
  a:active,
  .clickable:active {
    top: 1.2px;
  }

  ::selection {
    background: var(--selection);
  }
  ::-moz-selection {
    background: var(--selection);
  }

  // h4 {
  //   font-size: 3.6rem;
  //   // line-height: 4.5rem;
  // }

  // h5 {
  //   font-size: 2.4rem;
  //   // line-height: 3rem;
  // }

  // h6 {
  //   font-size: 1.8rem;
  //   // line-height: 1.8rem;
  // }

  // // =======h1=======
  // h1 {
  //   font-size: 4.8rem;
  //   line-height: 4.8rem;
  //   margin: 0 0 2.4rem 0;
  // }

  // @media screen and (min-width: 600px) {
  //   h1 {
  //     font-size: 9.6rem;
  //     line-height: 9.6rem;
  //     margin: 0 0 2.4rem 0;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   h1 {
  //     font-size: 12.8rem;
  //     line-height: 12.8rem;
  //     margin: 0 0 3.2rem 0;
  //   }
  // }

  // @media screen and (min-width: 1200px) {
  //   h1 {
  //     font-size: 14.4rem;
  //     line-height: 14.4rem;
  //     margin: 0 0 4.8rem 0;
  //   }
  // }

  // @media screen and (min-width: 1600px) {
  //   h1 {
  //     font-size: 18rem;
  //     line-height: 18rem;
  //     margin: 0 0 4.8rem 0;
  //   }
  // }
  // // =======/h1=======

  // // =======h2=======
  // h2 {
  //   font-size: 3.6rem;
  //   line-height: 3.9rem;
  // }

  // @media screen and (min-width: 600px) {
  //   h2 {
  //     font-size: 4.8rem;
  //     line-height: 4.8rem;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   h2 {
  //     font-size: 6.4rem;
  //     line-height: 6.4rem;
  //   }
  // }

  // @media screen and (min-width: 1200px) {
  //   h2 {
  //     font-size: 7.2rem;
  //     line-height: 7.2rem;
  //   }
  // }

  // @media screen and (min-width: 1600px) {
  //   h2 {
  //     font-size: 9rem;
  //     line-height: 9rem;
  //   }
  // }
  // // =======/h2=======

  // // =======h3=======
  // h3 {
  //   font-size: 2.2rem;
  //   line-height: 2.7rem;
  // }

  // @media screen and (min-width: 600px) {
  //   h3 {
  //     font-size: 3.7rem;
  //     line-height: 3rem;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   h3 {
  //     font-size: 4rem;
  //     line-height: 5rem;
  //   }
  // }

  // @media screen and (min-width: 1200px) {
  //   h3 {
  //     font-size: 4.5rem;
  //     line-height: 5.6rem;
  //   }
  // }

  // @media screen and (min-width: 1600px) {
  //   h3 {
  //     font-size: 5.6rem;
  //     line-height: 7rem;
  //   }
  // }
  // // =======/h3=======

  // // =======h4=======
  // h4 {
  //   font-size: 1.8rem;
  //   line-height: 2.2rem;
  //   margin: 1.2rem 0;
  // }

  // @media screen and (min-width: 600px) {
  //   h4 {
  //     font-size: 2.4rem;
  //     line-height: 3rem;
  //     margin: 1.2rem 0;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   h4 {
  //     font-size: 3.2rem;
  //     line-height: 4rem;
  //     margin: 1.6rem 0;
  //   }
  // }

  // @media screen and (min-width: 1200px) {
  //   h4 {
  //     font-size: 3.6rem;
  //     line-height: 4.5rem;
  //     margin: 2.4rem 0;
  //   }
  // }

  // @media screen and (min-width: 1600px) {
  //   h4 {
  //     font-size: 4.5rem;
  //     line-height: 5.6rem;
  //     margin: 2.4rem 0;
  //   }
  // }
  // // =======/h4=======

  // // =======h5=======
  // h5 {
  //   font-size: 1.8rem;
  //   line-height: 2.2rem;
  // }

  // @media screen and (min-width: 600px) {
  //   h5 {
  //     font-size: 2.4rem;
  //     line-height: 3rem;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   h5 {
  //     font-size: 2.4rem;
  //     line-height: 3rem;
  //   }
  // }

  // @media screen and (min-width: 1200px) {
  //   h5 {
  //     font-size: 2.4rem;
  //     line-height: 3rem;
  //   }
  // }

  // @media screen and (min-width: 1600px) {
  //   h5 {
  //     font-size: 3rem;
  //     line-height: 3.7rem;
  //   }
  // }
  // // =======/h5=======

  // // =======h6=======
  // h6 {
  //   font-size: 1.4rem;
  //   line-height: 2.1rem;
  // }

  // @media screen and (min-width: 600px) {
  //   h6 {
  //     font-size: 1.6rem;
  //     line-height: 2.4rem;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   h6 {
  //     font-size: 1.8rem;
  //     line-height: 2.7rem;
  //   }
  // }

  // @media screen and (min-width: 1200px) {
  //   h6 {
  //     font-size: 1.8rem;
  //     line-height: 2.7rem;
  //   }
  // }

  // @media screen and (min-width: 1600px) {
  //   h6 {
  //     font-size: 2.2rem;
  //     line-height: 3.3rem;
  //   }
  // }
  // // =======/h6=======

  // // =======p=======
  // p {
  //   font-size: 1.6rem;
  //   line-height: 2.4rem;
  // }

  // @media screen and (min-width: 600px) {
  //   p {
  //     font-size: 1.8rem;
  //     line-height: 2.7rem;
  //   }
  // }

  // @media screen and (min-width: 900px) {
  //   p {
  //     font-size: 1.8rem;
  //     line-height: 2.7rem;
  //   }
  // }

  @media screen and (min-width: 1200px) {
    p {
      font-size: 2rem;
      line-height: 3rem;
    }
  }

  @media screen and (min-width: 1600px) {
    p {
      font-size: 2.5rem;
      line-height: 3.7rem;
    }
  }
  // =======/p=======
`
