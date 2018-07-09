import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import CameraIcon from 'react-icons/lib/fa/camera';
import CircularProgress from '@material-ui/core/CircularProgress';
import Field from '../Field';
import * as userActions from '../../../../actions/user';
import { Avatar, DimmedLoader } from '../../../../components';

const IMAGE_SIZE = 128;

const Centered = styled.div`
  text-align: center;
`;
const FormHeader = styled.h1`
  font-weight: 800;
`;
const FileSelector = styled.input`
  display: none;
`;
const ProfileBlock = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
`;
const FieldWrapper = styled.div`
  flex: 1 1 auto;
  margin-right: 10px;
`;
const AvatarWrapper = styled.div`
  flex: 0 0;
  cursor: pointer;
  position: relative;
  width: ${IMAGE_SIZE}px;
  height ${IMAGE_SIZE}px;
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  background-color: rgba(0, 0, 0, 0.4);

  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s;
  &:hover {
    color: white;
  }
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
    imageState: PropTypes.object.isRequired,
    init: PropTypes.func.isRequired,
    nicknameState: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    signupStatus: PropTypes.string.isRequired,
    upload: PropTypes.func.isRequired,
    usernameState: PropTypes.object.isRequired,
    validate: PropTypes.func.isRequired,
  }
  componentWillUnmount() {
    this.props.init();
  }
  setSelectorRef = ref => {
    this._selector = ref;
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
  handleImageClick = () => {
    if (this._selector) {
      this._selector.click();
    }
  }
  handleFileChange = e => {
    const { files } = e.target;
    if (files && files.length > 0) {
      this.props.upload(files[0]);
    }
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
    const { imageState, validate, signup } = this.props;
    if (!isValid) {
      validate({ field: 'username', value: username });
      validate({ field: 'nickname', nickname });
      this.validateReg('password', password);
    }
    else {
      const userData = {
        username,
        password,
        nickname,
        imageUrl: imageState.imageUrl,
      };
      signup(userData);
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
      imageState,
    } = this.props;
    const activateButton = (
      valid.password &&
      usernameState.isValid &&
      nicknameState.isValid &&
      imageState.status !== 'WAITING'
    );
    return (
      <div>
        {
          signupStatus === 'WAITING' ?
            <DimmedLoader /> : null
        }
        <Centered>
          <FormHeader>
            Join DEVLOG
          </FormHeader>
        </Centered>
        <FileSelector type="file" innerRef={this.setSelectorRef} onChange={this.handleFileChange} />
        <form>
          <Field
            name="username"
            label="ID"
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
          <ProfileBlock>
            <FieldWrapper>
              <Field
                name="nickname"
                label="Nickname"
                value={nickname}
                onChange={this.handleChange('nickname')}
                isValid={init.nickname || nicknameState.isValid}
                message={nicknameState.message}
                fullWidth
              />
            </FieldWrapper>
            <AvatarWrapper>
              <Avatar src={imageState.imageUrl || undefined} size={IMAGE_SIZE} />
              { imageState.status === 'WAITING' ? (
                <IconWrapper>
                  <CircularProgress color="inherit" />
                </IconWrapper>
              ) : (
                <IconWrapper onClick={this.handleImageClick}>
                  <CameraIcon />
                </IconWrapper>
              )}
            </AvatarWrapper>
          </ProfileBlock>
          <Centered>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!activateButton || signupStatus === 'WAITING'}
              onClick={() => this.handleSignup(activateButton)}
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
  imageState: state.user.image,
  signupStatus: state.user.signup.status,
});
const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch(userActions.initSignup()),
  upload: file => dispatch(userActions.uploadImage(file)),
  validate: (payload) => dispatch(userActions.validate(payload)),
  signup: (userData) => dispatch(userActions.signup(userData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);

