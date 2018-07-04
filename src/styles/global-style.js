import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');

  html,
  body {
    height: 100%;
    width: 100%;
  }
  h1, h2, h3 {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);
  }
  button {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 600;
  }
`;
