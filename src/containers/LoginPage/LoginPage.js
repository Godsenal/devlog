import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    loginStatus: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.showModal('LOGIN_MODAL');
  }
  componentWillUnmount() {
  }
  render() {
    const { location, isAuthenticated, loginStatus } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    if (loginStatus === 'SUCCESS' || isAuthenticated) {
      return <Redirect to={from} />;
    }
    return null;
  }
}
