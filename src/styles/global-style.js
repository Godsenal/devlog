import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    font-family: 'Noto Sans','Nanum Gothic';
    position: relative;
    height: 100%;
    width: 100%;
    background: #fff;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3 {
    font-family: 'Rubik';
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);
  }
  p {
    font-family: 'Roboto', 'Nanum Gothic';
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
  }
  textarea {
    font-family: 'Roboto', 'Nanum Gothic';
  }
  button {
    background-color: transparent;
    font-family: 'Ubuntu Mono';
    font-weight: 600;
  }
  input {
    background: inherit;
  }
  .ace_editor {
    font-family: 'Ubuntu Mono',
    font-size: 16px;
  }
`;
