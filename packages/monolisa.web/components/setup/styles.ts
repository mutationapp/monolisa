import { css } from 'styled-jsx/css'

export default css`
  section {
    font-size: 0.875rem;
    line-height: 1.7rem;
  }

  section > div {
    margin: 10px 0;
  }

  .code {
    border: 1px dashed var(--shade-2);
    border-left: none;
    border-right: none;
  }

  figure :global(img) {
    border-radius: var(--radius);
  }
`
