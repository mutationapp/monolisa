import { css } from 'styled-jsx/css'

export default css.global`
  /**
* prism.js default theme for JavaScript, CSS and HTML
* Based on dabblet (http://dabblet.com)
* @author Lea Verou
*/

  code[class*='language-'],
  pre[class*='language-'] {
    color: black;
    color: var(--foreground);
    /* background: none; */
    /* text-shadow: 0 1px white; */
    /* font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; */
    /* font-size: 1em; */
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    /* background: #f5f2f0; */
    background: var(--background);
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
    color: var(--shade-5);
  }

  .token.punctuation {
    color: var(--shade-3);
    color: var(--shade-7);
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    /* color: #905; */
    color: var(--accent-5);
  }

  .token.deleted {
    /* color: #905; */
    color: var(--accent-0);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    /* color: #690; */
    color: var(--accent-4);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    /* color: #9a6e3a;
  background: hsla(0, 0%, 100%, 0.5); */
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #07a;
    /* color: var(--accent-6); */
  }

  .token.function,
  .token.class-name {
    /* color: #dd4a68; */
    color: var(--accent-1);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #e90;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  /* Line lumbers */
  pre[class*='language-'].line-numbers {
    position: relative;
    padding-left: 2.8em;
    counter-reset: linenumber;
  }

  pre[class*='language-'].line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 1px dotted var(--shade-2);
    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: var(--shade-3);
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }

  /* end Line lumbers */

  /* Mutants */
  #code .mutant-select {
    display: none;
  }

  #code.killed .mutant-select.killed {
    display: inherit;
  }

  #code.survived .mutant-select.survived {
    display: inherit;
  }

  .mutant-wrapper.active .mutant-code {
    position: relative;
    text-decoration: line-through solid var(--shade-6);
    cursor: pointer;
  }

  .mutant-wrapper.active.killed .mutant-code {
    text-decoration-color: var(--accent-4);
  }

  .mutant-wrapper.active.survived .mutant-code {
    text-decoration-color: var(--accent-0);
  }

  .mutant-wrapper.survived .mutant-select {
    color: var(--accent-0);
  }

  .mutant-wrapper.active .mutant-select:not(.active) {
    display: none;
  }

  .mutant-select {
    color: var(--accent-1);
    cursor: pointer;
    padding: 0 3px;
    font-weight: bold;
  }

  .mutant-select:not(.active) {
    font-size: 0;
  }
  .mutant-select:not(.active):after {
    content: '';
    width: 9px;
    border-radius: 50%;
    height: 9px;
    display: inline-block;
    background-color: var(--accent-1);
  }

  .mutant-select.survived:not(.active):after {
    background-color: var(--accent-0);
  }

  .mutant-select:not(.active):hover:after {
    background-color: var(--accent-0);
  }

  .mutant-select.killed:not(.active):after {
    background-color: var(--accent-4);
  }

  .mutant-select.killed {
    color: var(--accent-4);
  }
  .mutant-select.killed:not(.active):hover:after {
    background-color: var(--accent-4);
  }

  /* end Mutants */
`
