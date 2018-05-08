import {
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_VERIFY_REQUEST,
  USER_VALIDATE_REQUEST,
} from '../constants/actionTypes';

export function login(username, password) {
  return {
    type: USER_LOGIN_REQUEST,
    username,
    password,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT_REQUEST,
  };
}

export function verify() {
  return {
    type: USER_VERIFY_REQUEST,
  };
}
export function signup(username, password, nickname) {
  return {
    type: USER_SIGNUP_REQUEST,
    username,
    password,
    nickname,
  };
}
export function validate(username) {
  return {
    type: USER_VALIDATE_REQUEST,
    username,
  };
}
