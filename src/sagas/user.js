import { delay } from 'redux-saga';
import { all, call, put, fork, cancel, cancelled, takeLatest, take } from 'redux-saga/effects';
import * as authApi from '../api/auth';
import * as actions from '../constants/actionTypes';
import { jwt } from '../utils';
/**
 * Login
 */
function* login(id, pw) {
  try {
    const response = yield call(authApi.login, id, pw);
    const { _id, username, nickname, token } = response.data;
    jwt.setToken(token);
    yield put({
      type: actions.MODAL_CLOSE,
    });
    yield put({
      type: actions.USER_LOGIN_SUCCESS,
      _id,
      username,
      nickname,
    });
    yield put({
      type: actions.TOAST_ADD,
      message: `Welcome ${nickname}!`,
    });
  }
  catch (err) {
    /* istanbul ignore next */
    const { error } = err.response.data;
    yield put({
      type: actions.USER_LOGIN_FAILURE,
      error,
    });
  }
  finally {
    if (yield cancelled()) {
      jwt.removeToken();
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
  jwt.removeToken();
  yield put({
    type: actions.USER_LOGOUT_SUCCESS,
  });
}

function* signup(action) {
  const { username, password, nickname } = action;
  try {
    const response = yield call(authApi.signup, username, password, nickname);
    const userdata = response.data;
    yield put({
      type: actions.MODAL_CLOSE,
    });
    yield put({
      type: actions.USER_SIGNUP_SUCCESS,
      ...userdata,
    });
    yield put({
      type: actions.TOAST_ADD,
      message: 'Welcome!',
    });
  }
  catch (err) {
    /* istanbul ignore next */
    const { error } = err.response.data;
    yield put({
      type: actions.USER_SIGNUP_FAILURE,
      error,
    });
  }
}

function* verify() {
  const currentToken = jwt.getToken();
  if (!currentToken) {
    yield put({
      type: actions.USER_VERIFY_FAILURE,
    });
  }
  else {
    try {
      jwt.setToken(currentToken);
      const response = yield call(authApi.verify, currentToken);
      const { _id, username, nickname } = response.data;
      yield put({
        type: actions.USER_VERIFY_SUCCESS,
        _id,
        username,
        nickname,
      });
    }
    catch (err) {
      const { error } = err.response.data;
      jwt.removeToken();
      yield put({
        type: actions.USER_VERIFY_FAILURE,
        error,
      });
    }
    finally {
      if (yield cancelled()) {
        jwt.removeToken();
        yield put({
          type: actions.USER_VERIFY_FAILURE,
          error: 'Logout before verify',
        });
      }
    }
  }
}
function* validate(action) {
  yield call(delay, 300);
  try {
    const { username } = action;
    const response = yield call(authApi.validate, username);
    const { message } = response.data;
    yield put({
      type: actions.USER_VALIDATE_SUCCESS,
      message,
    });
  }
  catch (error) {
    const { message } = error.response.data;
    yield put({
      type: actions.USER_VALIDATE_FAILURE,
      message,
    });
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
      yield call(logout);
    }
  }
}
function* watchSignup() {
  yield takeLatest(actions.USER_SIGNUP_REQUEST, signup);
}
function* watchValidate() {
  yield takeLatest(actions.USER_VALIDATE_REQUEST, validate);
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchValidate),
  ]);
}
