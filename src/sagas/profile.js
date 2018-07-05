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
} from '../constants/actionTypes';
import { list } from '../api/log';
import { listBookmark } from '../api/user';

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
function* watchLatest() {
  yield takeLatest(PROFILE_LATEST_REQUEST, latest);
}
function* watchStars() {
  yield takeLatest(PROFILE_STARS_REQUEST, stars);
}
function* watchBookmarks() {
  yield takeLatest(PROFILE_BOOKMARKS_REQUEST, bookmarks);
}
export default function* root() {
  yield all([
    fork(watchLatest),
    fork(watchStars),
    fork(watchBookmarks),
  ]);
}

