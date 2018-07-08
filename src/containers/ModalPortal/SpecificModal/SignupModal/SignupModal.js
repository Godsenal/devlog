import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import Field from '../Field';
import * as userActions from '../../../../actions/user';
import { DimmedLoader } from '../../../../components';

const Centered = styled.div`
  text-align: center;
`;
const HeaderText = styled.h1`
  font-weight: 800;
`;
const VALID_REG = {
  password: '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
};
const FAILURE_MESSAGE = {
  password: 'Must contain at least 8 characters, at least one number and special characters',
};
class SignupModal extends Component {
  state = {
    username: '',
    password: '',
    nickname: '',
    valid: {
      password: false,
    },
    init: {
      username: true,
      password: true,
      nickname: true,
    },
  }
  static propTypes = {
    nicknameState: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    signupStatus: PropTypes.string.isRequired,
    usernameState: PropTypes.object.isRequired,
    validate: PropTypes.func.isRequired,
  }
  handleChange = name => e => {
    const { value } = e.target;
    const newState = update(this.state, {
      [name]: { $set: value },
      init: {
        [name]: { $set: false },
      },
    });
    this.setState(newState, () => this.handleValidation(name, value));
  }
  handleValidation = debounce((name, value) => {
    const trimmed = value.trim();
    switch (name) {
      case 'username':
        this.props.validate({ field: 'username', value: trimmed });
        break;
      case 'nickname':
        this.props.validate({ field: 'nickname', value: trimmed });
        break;
      case 'password': {
        const isValid = this.validateReg(name, trimmed);
        const updated = update(this.state, {
          valid: {
            password: { $set: isValid },
          },
        });
        this.setState(updated);
        break;
      }
      default:
    }
  }, 300)
  /* validate with regExp and return isValid, trimmed value */
  validateReg = (name, value) => {
    if (value.match(VALID_REG[name])) {
      return true;
    }
    return false;
  }
  handleSignup = (isValid) => {
    const { username, password, nickname } = this.state;
    const { validate, signup } = this.props;
    if (!isValid) {
      validate({ field: 'username', value: username });
      validate({ field: 'nickname', nickname });
      this.validateReg('password', password);
    }
    else {
      signup(username, password, nickname);
    }
  }
  // value : selected tag _id.
  getMessage = (name, isValid) => {
    if (isValid) {
      return '';
    }
    return FAILURE_MESSAGE[name];
  }
  render() {
    const {
      username,
      password,
      nickname,
      valid,
      init,
    } = this.state;
    const {
      usernameState,
      nicknameState,
      signupStatus,
    } = this.props;
    const isValid = valid.password && usernameState.isValid && nicknameState.isValid;
    return (
      <div>
        {
          signupStatus === 'WAITING' ?
            <DimmedLoader /> : null
        }
        <Centered>
          <HeaderText>
            Join DEVLOG
          </HeaderText>
        </Centered>
        <form>
          <Field
            name="username"
            label="Username"
            value={username}
            onChange={this.handleChange('username')}
            isValid={init.username || usernameState.isValid}
            message={usernameState.message}
            fullWidth
          />
          <Field
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={this.handleChange('password')}
            isValid={init.password || valid.password}
            message={this.getMessage('password', valid.password)}
            fullWidth
          />
          <Field
            name="nickname"
            label="Nickname"
            value={nickname}
            onChange={this.handleChange('nickname')}
            isValid={init.nickname || nicknameState.isValid}
            message={nicknameState.message}
            fullWidth
          />
          <Centered>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!isValid || signupStatus === 'WAITING'}
              onClick={() => this.handleSignup(isValid)}
            >
              Signup
            </Button>
          </Centered>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  usernameState: state.user.validate.username,
  nicknameState: state.user.validate.nickname,
  signupStatus: state.user.signup.status,
});
const mapDispatchToProps = (dispatch) => ({
  validate: (payload) => dispatch(userActions.validate(payload)),
  signup: (username, password, nickname) => dispatch(userActions.signup(username, password, nickname)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);

