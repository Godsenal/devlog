import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';

import Field from './Field';
import { DimmedLoader } from '../../../components';
import * as userActions from '../../../actions/user';

class LoginModal extends Component {
  state = {
    username: '',
    password: '',
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired,
    loginStatus: PropTypes.string.isRequired,
  }
  _login = false;
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleLogin = () => {
    this._login = true;
    const { username, password } = this.state;
    this.props.dispatch(userActions.login(username, password));
  }
  render() {
    const { username, password } = this.state;
    const { loginStatus, loginError } = this.props;
    return (
      <Form>
        {
          loginStatus === 'WAITING' ? <DimmedLoader /> : null
        }
        {
          loginStatus === 'FAILURE' && this._login ?
            <Message visible error>
              <p>{loginError}</p>
            </Message> : null
        }
        <Field
          name="username"
          label="Username"
          onChange={this.handleChange}
          value={username}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          onChange={this.handleChange}
          value={password}
        />
        <Button onClick={this.handleLogin} >Log in</Button>
      </Form>
    );
  }
}
const mapStateToProps = state => ({
  loginStatus: state.user.login.status,
  loginError: state.user.login.error,
});

export default connect(mapStateToProps)(LoginModal);
