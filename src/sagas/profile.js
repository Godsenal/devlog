import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  PROFILE_LATEST_REQUEST,
  PROFILE_LATEST_SUCCESS,
  PROFILE_LATEST_FAILURE,
  PROFILE_STARS_REQUEST,
  PROFILE_STARS_SUCCESS,
  PROFILE_STARS_FAILURE,
} from '../constants/actionTypes';
import { list } from '../api/log';

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
function* watchLatest() {
  yield takeLatest(PROFILE_LATEST_REQUEST, latest);
}
function* watchStars() {
  yield takeLatest(PROFILE_STARS_REQUEST, stars);
}
export default function* root() {
  yield all([
    fork(watchLatest),
    fork(watchStars),
  ]);
}

