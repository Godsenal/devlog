import { all, call, put, fork, cancel, cancelled, takeLatest, take } from 'redux-saga/effects';
import * as authApi from '../api/auth';

import * as actions from '../constants/actionTypes';

/**
 * Login
 */
function* login(id, pw) {
  try {
    const { _id, username, nickname, token } = yield call(authApi.login, id, pw);
    localStorage.setItem('token', token);
    yield put({
      type: actions.USER_LOGIN_SUCCESS,
      _id,
      username,
      nickname,
    });
  }
  catch (error) {
    /* istanbul ignore next */
    yield put({
      type: actions.USER_LOGIN_FAILURE,
      error,
    });
  }
  finally {
    if (yield cancelled()) {
      localStorage.removeItem('token');
      yield put({
        type: actions.USER_LOGIN_FAILURE,
        error: 'Logout before login',
      });
    }
  }
}

/**
 * Logout
 */
function* logout() {
  localStorage.removeItem('token');
  yield put({
    type: actions.USER_LOGOUT_SUCCESS,
  });
}

function* signup(action) {
  const { username, password, nickname } = action;
  try {
    yield call(authApi.signup, username, password, nickname);
    yield put({
      type: actions.USER_SIGNUP_SUCCESS,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: actions.USER_SIGNUP_FAILURE,
      payload: err,
    });
  }
}

function* verify() {
  const currentToken = localStorage.getItem('token');
  if (!currentToken) {
    yield put({
      type: actions.USER_VERIFY_FAILURE,
    });
  }
  else {
    try {
      const { _id, username, nickname, token } = yield call(authApi.verify, currentToken);
      localStorage.setItem('token', token);
      yield put({
        type: actions.USER_VERIFY_SUCCESS,
        _id,
        username,
        nickname,
      });
    }
    catch (error) {
      localStorage.removeItem('token');
      yield put({
        type: actions.USER_VERIFY_FAILURE,
        error,
      });
    }
    finally {
      if (yield cancelled()) {
        localStorage.removeItem('token');
        yield put({
          type: actions.USER_VERIFY_FAILURE,
          error: 'Logout before verify',
        });
      }
    }
  }
}
/*
  LOGIN FLOW
  1. waiting for USER_LOGIN_REQUEST and USER_VERIFY_REQUEST
  2. make login task or verify task by 'fork'
  3. after making login or verify task, take USER_LOGOUT_REQUEST, USER_LOGIN_FAILURE and USER_VERFIY FAILURE.
     So, even if USER_LOGOUT_REQUEST comes while login or verify task is processing, it can be cancelled.
*/
function* watchLogin() {
  let task;
  while (true) {
    const loginAction = yield take([actions.USER_LOGIN_REQUEST, actions.USER_VERIFY_REQUEST]);
    if (loginAction.type === actions.USER_LOGIN_REQUEST) {
      task = yield fork(login, loginAction.username, loginAction.password);
    }
    else {
      task = yield fork(verify);
    }
    const logoutAction = yield take([actions.USER_LOGOUT_REQUEST, actions.USER_LOGIN_FAILURE, actions.USER_VERIFY_FAILURE]);
    if (logoutAction.type === actions.USER_LOGOUT_REQUEST) {
      yield cancel(task);
    }
    yield call(logout);
  }
}
function* watchSignup() {
  yield takeLatest(actions.USER_SIGNUP_REQUEST, signup);
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
