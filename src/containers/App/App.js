import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';

import Home from '../Home';
import styles from './App.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.cocntainer}>
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
