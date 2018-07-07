import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  PROFILE_LATEST_REQUEST,
  PROFILE_LATEST_SUCCESS,
  PROFILE_LATEST_FAILURE,
  PROFILE_STARS_REQUEST,
  PROFILE_STARS_SUCCESS,
  PROFILE_STARS_FAILURE,
  PROFILE_BOOKMARKS_REQUEST,
  PROFILE_BOOKMARKS_SUCCESS,
  PROFILE_BOOKMARKS_FAILURE,
  PROFILE_FOLLOWING_REQUEST,
  PROFILE_FOLLOWING_SUCCESS,
  PROFILE_FOLLOWING_FAILURE,
  PROFILE_FOLLOWER_REQUEST,
  PROFILE_FOLLOWER_SUCCESS,
  PROFILE_FOLLOWER_FAILURE,
} from '../constants/actionTypes';
import { list } from '../api/log';
import { listBookmark, listFollower, listFollowing } from '../api/user';

function* latest(action) {
  const { skip, limit, author_nickname, listType } = action;
  try {
    const { data } = yield call(list, { skip, limit, author_nickname });
    const { logs } = data;
    const payload = {
      ...data,
      listType,
      isInit: skip === 0,
      isLast: logs.length < limit,
      limit,
    };
    yield put({
      type: PROFILE_LATEST_SUCCESS,
      ...payload,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: PROFILE_LATEST_FAILURE,
      listType,
      error,
    });
  }
}
function* stars(action) {
  const { skip, limit, star_user_id, listType } = action;
  try {
    const { data } = yield call(list, { skip, limit, star_user_id });
    const { logs } = data;
    const payload = {
      ...data,
      listType,
      isInit: skip === 0,
      isLast: logs.length < limit,
      limit,
    };
    yield put({
      type: PROFILE_STARS_SUCCESS,
      ...payload,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: PROFILE_STARS_FAILURE,
      listType,
      error,
    });
  }
}
function* bookmarks(action) {
  const { skip, limit, listType } = action;
  try {
    const { data } = yield call(listBookmark, { skip, limit });
    const { bookmarks: logs } = data;
    const payload = {
      logs,
      listType,
      isInit: skip === 0,
      isLast: logs.length < limit,
      limit,
    };
    yield put({
      type: PROFILE_BOOKMARKS_SUCCESS,
      ...payload,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    // logout when INVALID STATUS error ?
    yield put({
      type: PROFILE_BOOKMARKS_FAILURE,
      error,
    });
  }
}
function* follower(action) {
  const { nickname, skip, limit } = action;
  try {
    const { data } = yield call(listFollower, { nickname, skip, limit });
    const { followers } = data;
    const payload = {
      followers,
      limit,
      isInit: skip === 0,
      isLast: followers.length < limit,
    };
    yield put({
      type: PROFILE_FOLLOWER_SUCCESS,
      ...payload,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: PROFILE_FOLLOWER_FAILURE,
      error,
    });
  }
}
function* following(action) {
  const { nickname, skip, limit } = action;
  try {
    const { data } = yield call(listFollowing, { nickname, skip, limit });
    const { followings } = data;
    const payload = {
      followings,
      limit,
      isInit: skip === 0,
      isLast: followings.length < limit,
    };
    yield put({
      type: PROFILE_FOLLOWING_SUCCESS,
      ...payload,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: PROFILE_FOLLOWING_FAILURE,
      error,
    });
  }
}
function* watchLatest() {
  yield takeLatest(PROFILE_LATEST_REQUEST, latest);
}
function* watchStars() {
  yield takeLatest(PROFILE_STARS_REQUEST, stars);
}
function* watchBookmarks() {
  yield takeLatest(PROFILE_BOOKMARKS_REQUEST, bookmarks);
}
function* watchFollowing() {
  yield takeLatest(PROFILE_FOLLOWING_REQUEST, following);
}
function* watchFollower() {
  yield takeLatest(PROFILE_FOLLOWER_REQUEST, follower);
}
export default function* root() {
  yield all([
    fork(watchLatest),
    fork(watchStars),
    fork(watchBookmarks),
    fork(watchFollowing),
    fork(watchFollower),
  ]);
}

