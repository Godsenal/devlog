import {
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_VERIFY_REQUEST,
  USER_VALIDATE_REQUEST,
  USER_BOOKMARK_REQUEST,
  USER_FOLLOW_REQUEST,
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
