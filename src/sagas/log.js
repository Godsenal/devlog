import { all, call, put, fork, take, takeLatest, cancel } from 'redux-saga/effects';

import {
  LOG_POST_REQUEST,
  LOG_POST_SUCCESS,
  LOG_POST_FAILURE,
  LOG_LIST_REQUEST,
  LOG_LIST_SUCCESS,
  LOG_LIST_FAILURE,
  LOG_GET_REQUEST,
  LOG_GET_SUCCESS,
  LOG_GET_FAILURE,
  LOG_STAR_REQUEST,
  LOG_STAR_SUCCESS,
  LOG_STAR_FAILURE,
  LOG_POST_COMMENT_REQUEST,
  LOG_POST_COMMENT_SUCCESS,
  LOG_POST_COMMENT_FAILURE,
} from '../constants/actionTypes';
import * as logApi from '../api/log';

function* post(action) {
  try {
    const { log } = action;
    const { data } = yield call(logApi.post, log);
    yield put({
      type: LOG_POST_SUCCESS,
      ...data,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: LOG_POST_FAILURE,
      error,
    });
  }
}
function* list(action) {
  try {
    const { skip, limit, author_nickname, star_user_id } = action;
    const { data } = yield call(logApi.list, { skip, limit, author_nickname, star_user_id });
    const { logs } = data;
    const payload = {
      ...data,
      isInit: skip === 0,
      isLast: logs.length < limit,
      limit,
    };
    yield put({
      type: LOG_LIST_SUCCESS,
      ...payload,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: LOG_LIST_FAILURE,
      error,
    });
  }
}
function* get(action) {
  try {
    const { logId } = action;
    const { data } = yield call(logApi.get, logId);
    const { log } = data;
    yield put({
      type: LOG_GET_SUCCESS,
      log,
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: LOG_GET_FAILURE,
      error,
    });
  }
}
function* star(action) {
  try {
    const { logId, userId, isStared } = action;
    const body = {
      logId,
      userId,
      isStared,
    };
    const { data } = yield call(logApi.star, body);
    const { stars } = data;
    yield put({
      type: LOG_STAR_SUCCESS,
      stars,
      logId,
    });

    // TODO: add raw update for star and update log_star reducer
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: LOG_STAR_FAILURE,
      error,
    });
  }
}
function* postComment(action) {
  try {
    const { comment } = action;
    const { data } = yield call(logApi.postComment, comment);
    const { comment: newComment, comments } = data;
    yield put({
      type: LOG_POST_COMMENT_SUCCESS,
      comment: newComment || {},
      comments: comments || [],
    });
  }
  catch (err) {
    const { error } = err.response.data;
    yield put({
      type: LOG_POST_COMMENT_FAILURE,
      error,
    });
  }
}
function* watchPost() {
  yield takeLatest(LOG_POST_REQUEST, post);
}
function* watchList() {
  yield takeLatest(LOG_LIST_REQUEST, list);
}
function* watchGet() {
  yield takeLatest(LOG_GET_REQUEST, get);
}
function* watchStar() {
  let task;
  while (true) {
    const action = yield take(LOG_STAR_REQUEST);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(star, action);
  }
}
function* watchPostComment() {
  yield takeLatest(LOG_POST_COMMENT_REQUEST, postComment);
}
/**
 * Log Sagas
 */
export default function* root() {
  yield all([
    fork(watchPost),
    fork(watchList),
    fork(watchGet),
    fork(watchStar),
    fork(watchPostComment),
  ]);
}
