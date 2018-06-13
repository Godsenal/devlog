import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import configureStore from '../store/configureStore';
import theme from '../styles/theme';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
