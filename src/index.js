import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import './styles/global-style';

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);
