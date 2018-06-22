import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Field from '../Field';
import { DimmedLoader } from '../../../../components';
import * as userActions from '../../../../actions/user';

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
      <form>
        {
          loginStatus === 'WAITING' ? <DimmedLoader /> : null
        }
        {
          loginStatus === 'FAILURE' && this._login ?
            <div>
              <p>{loginError}</p>
            </div> : null
        }
        <Field
          name="username"
          label="Username"
          onChange={this.handleChange}
          value={username}
          fullWidth
        />
        <Field
          name="password"
          label="Password"
          type="password"
          onChange={this.handleChange}
          value={password}
          fullWidth
        />
        <Button variant="outlined" onClick={this.handleLogin} >Log in</Button>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  loginStatus: state.user.login.status,
  loginError: state.user.login.error,
});

export default connect(mapStateToProps)(LoginModal);
