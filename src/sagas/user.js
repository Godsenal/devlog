import { all, call, put, fork, cancel, cancelled, takeLatest, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as authApi from '../api/auth';
import { uploadImage } from '../api/cloudinary';
import * as userApi from '../api/user';
import * as actions from '../constants/actionTypes';
import { jwt } from '../utils';
/**
 * Login
 */
function* login(id, pw) {
  try {
    const response = yield call(authApi.login, id, pw);
    const userdata = response.data;
    jwt.setToken(userdata.token);
    yield put({
      type: actions.MODAL_CLOSE,
    });
    yield put({
      type: actions.USER_LOGIN_SUCCESS,
      ...userdata,
    });
    yield put({
      type: actions.USER_VERIFY_SUCCESS,
      ...userdata,
    });
    yield put({
      type: actions.TOAST_ADD,
      toastProps: {
        message: `Welcome ${userdata.nickname}!`,
      },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    const { error } = err.response.data;
    yield put({
      type: actions.USER_LOGIN_FAILURE,
      error,
    });
    yield put({
      type: actions.TOAST_ADD,
      toastProps: {
        type: 'error',
        message: 'Incorrect Username or Password',
      },
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
  try {
    const response = yield call(authApi.signup, action);
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
      toastProps: {
        message: 'Welcome!',
      },
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
      const userdata = response.data;
      yield put({
        type: actions.USER_VERIFY_SUCCESS,
        ...userdata,
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
  const { field, value } = action;
  try {
    const { data } = yield call(authApi.validate, { field, value });
    const { isValid, message } = data;
    yield put({
      type: actions.USER_VALIDATE_SUCCESS,
      isValid,
      message,
      field,
    });
  }
  catch (error) {
    const { message } = error.response.data;
    yield put({
      type: actions.USER_VALIDATE_FAILURE,
      message,
      field,
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
function* get(action) {
  try {
    const { nickname } = action;
    const { data } = yield call(userApi.get, nickname);
    const { user } = data;
    yield put({
      type: actions.USER_GET_SUCCESS,
      user,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: actions.USER_GET_FAILURE,
      error,
    });
  }
}
function* bookmark(action) {
  try {
    const { logId, userId, isBookmarked } = action;
    const { data } = yield call(userApi.bookmark, { logId, userId, isBookmarked });
    const { bookmarks } = data;

    yield put({
      type: actions.USER_BOOKMARK_SUCCESS,
      bookmarks,
      bookmark: logId,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: actions.USER_BOOKMARK_FAILURE,
      error,
    });
  }
}
function* follow(action) {
  try {
    const { userId, followingId, isFollowed } = action;
    const { data } = yield call(userApi.follow, { userId, followingId, isFollowed });
    const { followings } = data;
    yield put({
      type: actions.USER_FOLLOW_SUCCESS,
      followings,
      followingId,
      isFollowed,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: actions.USER_FOLLOW_FAILURE,
      error,
    });
  }
}
function* uploadProfileImage(file) {
  const imageReg = /[/.](gif|jpg|jpeg|tiff|png)$/i;
  if (!imageReg.test(file.type)) {
    yield put({
      type: actions.USER_IMAGE_FAILURE,
      error: 'An error occurred. Maybe it is not valid image file?',
    });
    yield put({
      type: actions.TOAST_ADD,
      toastProps: {
        message: 'An error occurred.Maybe it is not an image file?',
        type: 'error',
      },
    });
    return;
  }
  try {
    const { response, timeout } = yield race({
      response: yield call(uploadImage, file),
      timeout: delay(5000),
    });
    if (timeout) {
      yield put({
        type: actions.USER_IMAGE_FAILURE,
        error: 'An error occured. Request timeout.',
      });
      yield put({
        type: actions.TOAST_ADD,
        toastProps: {
          message: 'An error occurred. Please try again.',
          type: 'error',
        },
      });
      return;
    }
    const { data } = response;
    /* Crop Profile Image */
    const url = data.secure_url;
    const tokens = url.split('/');
    tokens.splice(-2, 0, 'w_128,h_128,c_thumb,r_max');
    const croppedUrl = tokens.join('/');
    yield put({
      type: actions.USER_IMAGE_SUCCESS,
      imageUrl: croppedUrl,
    });
  }
  catch (err) {
    yield put({
      type: actions.USER_IMAGE_FAILURE,
      error: 'Error has been occured. Please try again',
    });
    yield put({
      type: actions.TOAST_ADD,
      toastProps: {
        message: 'An error occured. Please try again',
        type: 'error',
      },
    });
  }
  finally {
    if (yield cancelled()) {
      yield put({
        type: actions.USER_IMAGE_FAILURE,
        error: 'Close before upload',
      });
    }
  }
}
function* watchSignup() {
  yield takeLatest(actions.USER_SIGNUP_REQUEST, signup);
}
function* watchValidate() {
  yield takeLatest(actions.USER_VALIDATE_REQUEST, validate);
}
function* watchGet() {
  yield takeLatest(actions.USER_GET_REQUEST, get);
}
function* watchBookmark() {
  yield takeLatest(actions.USER_BOOKMARK_REQUEST, bookmark);
}
function* watchFollow() {
  yield takeLatest(actions.USER_FOLLOW_REQUEST, follow);
}
function* watchImage() {
  let task;
  while (true) {
    const imageAction = yield take(actions.USER_IMAGE_REQUEST);

    /* Check if modal closed before upload */
    task = yield fork(uploadProfileImage, imageAction.file);
    const sideEffect = yield take([actions.USER_IMAGE_SUCCESS, actions.USER_IMAGE_FAILURE, actions.MODAL_CLOSE]);
    if (sideEffect.type === actions.MODAL_CLOSE) {
      yield cancel(task);
    }
  }
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchValidate),
    fork(watchGet),
    fork(watchBookmark),
    fork(watchFollow),
    fork(watchImage),
  ]);
}
