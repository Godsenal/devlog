import { delay } from 'redux-saga';
import { all, call, put, fork, cancel, cancelled, takeLatest, take } from 'redux-saga/effects';
import * as authApi from '../api/auth';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,

  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../constants/actionTypes';

/**
 * Login
 */
function* login(username, password) {
  try {
    const { token, isValid } = yield call(authApi.login, username, password);
    console.log(token, isValid);
    yield put({
      type: USER_LOGIN_SUCCESS,
      token,
      isValid,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: USER_LOGIN_FAILURE,
      payload: err,
    });
  }
  finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

/**
 * Logout
 */
function* logout() {
  try {
    yield call(delay, 200);

    yield put({
      type: USER_LOGOUT_SUCCESS,
    });
  }
  catch (err) {
    yield put({
      type: USER_LOGOUT_FAILURE,
      payload: err,
    });
  }
}


function* signup(action) {
  const { username, password, nickname } = action;
  try {
    const { userdata } = yield call(authApi.signup, username, password, nickname);
    yield put({
      type: USER_SIGNUP_SUCCESS,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: USER_SIGNUP_FAILURE,
      payload: err,
    });
  }
}

/*
  LOGIN FLOW
  1. waiting for USER_LOGIN_REQUEST
  2. make login task by 'fork'
  3. after making login task, take USER_LOGOUT_REQUEST and USER_LOGIN_FAILURE.
     So, even if USER_LOGOUT_REQUEST comes while login task is processing, it can cancel login task.
*/
function* watchLogin() {
  while (true) {
    const { username, password } = yield take(USER_LOGIN_REQUEST);

    const task = yield fork(login, username, password);
    const action = yield take([USER_LOGOUT_REQUEST, USER_LOGIN_FAILURE]);
    if (action.type === USER_LOGOUT_REQUEST) {
      yield cancel(task);
    }
    yield call(logout);
  }
}
function* watchSignup() {
  yield takeLatest(USER_SIGNUP_REQUEST, signup);
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
  ]);
}
