import {
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_VERIFY_REQUEST,
  USER_VALIDATE_REQUEST,
  USER_GET_REQUEST,
  USER_BOOKMARK_REQUEST,
  USER_FOLLOW_REQUEST,
  USER_IMAGE_REQUEST,
  USER_SIGNUP_INITIALIZE,
} from '../constants/actionTypes';
import { history } from '../utils';

export function login(username, password) {
  return {
    type: USER_LOGIN_REQUEST,
    username,
    password,
  };
}

export function logout() {
  // Delete all reducer
  history.push('/');
  return {
    type: USER_LOGOUT_REQUEST,
  };
}

export function verify() {
  return {
    type: USER_VERIFY_REQUEST,
  };
}
export function signup({ username, nickname, password, imageUrl }) {
  return {
    type: USER_SIGNUP_REQUEST,
    username,
    password,
    nickname,
    imageUrl,
  };
}
export function validate({ field = 'username', value = '' }) {
  return {
    type: USER_VALIDATE_REQUEST,
    field,
    value,
  };
}
export function getUser(nickname) {
  return {
    type: USER_GET_REQUEST,
    nickname,
  };
}
export function bookmark({ userId, logId, isBookmarked = false }) {
  return {
    type: USER_BOOKMARK_REQUEST,
    userId,
    logId,
    isBookmarked,
  };
}
export function follow({ userId, followingId, isFollowed = false }) {
  return {
    type: USER_FOLLOW_REQUEST,
    userId,
    followingId,
    isFollowed,
  };
}

export function uploadImage(file) {
  return {
    type: USER_IMAGE_REQUEST,
    file,
  };
}

export function initSignup() {
  return {
    type: USER_SIGNUP_INITIALIZE,
  };
}
