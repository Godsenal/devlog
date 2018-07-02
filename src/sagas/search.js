import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  SEARCH_TAG_REQUEST,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILURE,
  SEARCH_PRE_REQUEST,
  SEARCH_PRE_SUCCESS,
  SEARCH_PRE_FAILURE,
  SEARCH_LOG_REQUEST,
  SEARCH_LOG_SUCCESS,
  SEARCH_LOG_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from '../constants/actionTypes';
import * as SearchApi from '../api/search';

function* searchPre(action) {
  const { q } = action;
  try {
    const { data } = yield call(SearchApi.searchPre, q);
    const { users, tags } = data.result;
    const len = users.length + tags.length;
    yield put({
      type: SEARCH_PRE_SUCCESS,
      users,
      tags,
      len,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: SEARCH_PRE_FAILURE,
      error,
    });
  }
}
function* searchLog(action) {
  const { skip, limit, q } = action;
  try {
    const { data } = yield call(SearchApi.searchLog, { skip, limit, q });
    const { logs } = data;
    yield put({
      type: SEARCH_LOG_SUCCESS,
      isInit: skip === 0,
      isLast: logs.length < limit,
      logs,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: SEARCH_LOG_FAILURE,
      error,
    });
  }
}
function* searchUser(action) {
  const { skip, limit, q } = action;
  try {
    const { data } = yield call(SearchApi.searchUser, { skip, limit, q });
    const { users } = data;
    yield put({
      type: SEARCH_USER_SUCCESS,
      isInit: skip === 0,
      isLast: users.length < limit,
      users,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: SEARCH_USER_FAILURE,
      error,
    });
  }
}
function* searchTag(action) {
  const { q, skip, limit } = action;
  if (q.length === 0) {
    yield put({
      type: SEARCH_TAG_SUCCESS,
      tags: [],
      isInit: true,
      isLast: false,
    });
    return;
  }
  try {
    const { data } = yield call(SearchApi.searchTag, { q, skip, limit });
    const { tags } = data;
    yield put({
      type: SEARCH_TAG_SUCCESS,
      tags,
      isInit: skip === 0,
      isLast: tags.length < limit,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: SEARCH_TAG_FAILURE,
      error,
    });
  }
}
function* watchSearchPre() {
  yield takeLatest(SEARCH_PRE_REQUEST, searchPre);
}
function* watchSearchLog() {
  yield takeLatest(SEARCH_LOG_REQUEST, searchLog);
}
function* watchSearchUser() {
  yield takeLatest(SEARCH_USER_REQUEST, searchUser);
}
function* watchSearchTag() {
  yield takeLatest(SEARCH_TAG_REQUEST, searchTag);
}
export default function* root() {
  yield all([
    fork(watchSearchPre),
    fork(watchSearchUser),
    fork(watchSearchLog),
    fork(watchSearchTag),
  ]);
}
