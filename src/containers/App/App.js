import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ModalPortal, ToastPortal, Home } from '../';
import { resize } from '../../actions/environment';

class App extends Component {
  constructor() {
    super();
    window.addEventListener('resize', this.handleResize);
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    this.props.dispatch(resize());
  }
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <ModalPortal />
        <ToastPortal />
      </div>
    );
  }
}

export default connect()(App);
