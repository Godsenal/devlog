import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background: #fff;
  }
  h1, h2, h3 {
    font-family: 'Rubik';
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);
  }
  button {
    font-family: 'Ubuntu';
    font-weight: 600;
  }
  input {
    background: inherit;
  }
`;
