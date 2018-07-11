import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Field from '../Field';
import { DimmedLoader } from '../../../../components';
import * as userActions from '../../../../actions/user';

const Centered = styled.div`
  text-align: center;
`;
const HeaderText = styled.h1`
  font-weight: 400;

  margin: 50px 0;
`;
class LoginModal extends Component {
  state = {
    username: '',
    password: '',
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
  handleEnter = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }
  render() {
    const { username, password } = this.state;
    const { loginStatus } = this.props;
    return (
      <form>
        <Centered>
          <HeaderText>
            Login to DEVLOG
          </HeaderText>
        </Centered>
        {
          loginStatus === 'WAITING' ? <DimmedLoader /> : null
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
          onKeyPress={this.handleEnter}
          value={password}
          fullWidth
        />
        <Centered>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={this.handleLogin}
          >
            Log in
          </Button>
        </Centered>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  loginStatus: state.user.login.status,
});

export default connect(mapStateToProps)(LoginModal);
