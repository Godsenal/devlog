import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import Field from '../Field';
import * as userActions from '../../../../actions/user';
import { DimmedLoader } from '../../../../components';

const VALID_REG = {
  password: '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
  nickname: '^[a-zA-Z0-9_]{6,15}$',
};
const FAILURE_MESSAGE = {
  password: 'Must contain at least 8 characters, at least one number and special characters',
  'confirm password': 'Must be same with the password',
  nickname: 'Must contain 6-12 characters, without any special characters',
};
class SignupModal extends Component {
  state = {
    username: '',
    password: '',
    confirm_password: '',
    nickname: '',
    valid: {
      password: false,
      confirm_password: false,
      nickname: false,
    },
    init: {
      username: true,
      password: true,
      confirm_password: true,
      nickname: true,
    },
  }
  static propTypes = {
    signup: PropTypes.func.isRequired,
    signupStatus: PropTypes.string.isRequired,
    validate: PropTypes.func.isRequired,
    validateState: PropTypes.object.isRequired,
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
        this.props.validate(trimmed);
        break;
      case 'nickname':
      case 'password': {
        const isValid = this.validateReg(name, trimmed);
        const updated = update(this.state, {
          valid: {
            [name]: { $set: isValid },
          },
        });
        this.setState(updated);
        break;
      }
      case 'confirm_password':
        this.setState(update(this.state, {
          valid: {
            [name]: { $set: this.state.password === trimmed },
          },
        }));
        break;
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
      validate(username);
      this.validateReg('password', password);
      this.validateReg('nickname', nickname);
    }
    else {
      signup(username, password, nickname);
    }
  }
  // value : selected tag _id.
  getMessage = (name, isValid) => {
    if (isValid) {
      return `Good ${name}!`;
    }
    return FAILURE_MESSAGE[name];
  }
  render() {
    const {
      username,
      password,
      confirm_password,
      nickname,
      valid,
      init,
    } = this.state;
    const {
      validateState,
      signupStatus,
    } = this.props;
    const isValid = valid.password && valid.confirm_password && valid.nickname && validateState.isValid;
    return (
      <div>
        {
          signupStatus === 'WAITING' ?
            <DimmedLoader /> : null
        }
        <form noValidate>
          <Field
            name="username"
            label="Username"
            value={username}
            onChange={this.handleChange('username')}
            isValid={validateState.isValid}
            hasMessage={validateState.status !== 'INIT'}
            message={validateState.message}
            margin="normal"
            fullWidth
          />
          <Field
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={this.handleChange('password')}
            isValid={valid.password}
            hasMessage={!init.password}
            message={this.getMessage('password', valid.password)}
            fullWidth
          />
          <Field
            name="confirm_password"
            label="Confirm Password"
            type="password"
            value={confirm_password}
            onChange={this.handleChange('confirm_password')}
            isValid={valid.confirm_password}
            hasMessage={!init.confirm_password}
            message={this.getMessage('confirm password', valid.confirm_password)}
            fullWidth
          />
          <Field
            name="nickname"
            label="Nickname"
            value={nickname}
            onChange={this.handleChange('nickname')}
            isValid={valid.nickname}
            hasMessage={!init.nickname}
            message={this.getMessage('nickname', valid.nickname)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!isValid || signupStatus === 'WAITING'}
            onClick={() => this.handleSignup(isValid)}
          >
            Signup
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  validateState: state.user.validate,
  signupStatus: state.user.signup.status,
});
const mapDispatchToProps = (dispatch) => ({
  validate: (username) => dispatch(userActions.validate(username)),
  signup: (username, password, nickname) => dispatch(userActions.signup(username, password, nickname)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);

