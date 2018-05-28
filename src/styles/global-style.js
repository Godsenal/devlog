import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');

  html,
  body {
    height: 100%;
    width: 100%;
  }
  
  button {
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 600;
  }
`;
