import {
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
} from '../constants/actionTypes';

export function login(username, password) {
  return {
    type: USER_LOGIN_REQUEST,
    username,
    password,
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
