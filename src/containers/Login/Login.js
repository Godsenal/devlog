import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {
    handleLoginModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    loginStatus: PropTypes.string.isRequired,
  }
  render() {
    const { location, isAuthenticated, loginStatus, handleLoginModal } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    if (loginStatus === 'SUCCESS' || isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <h1>Login Please!</h1>
        <button onClick={handleLoginModal}>login</button>
      </div>
    );
  }
}
