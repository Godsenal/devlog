import { all, apply, call, put, fork, take, takeLatest, cancel } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';
import { createSocket } from '../utils';

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
  LOG_SOCKET_CONNECT,
  LOG_SOCKET_DISCONNECT,
  LOG_NEW_COUNT_UPDATE,
  PROFILE_LIST_RAW_UPDATE,
  SEARCH_LOG_RAW_UPDATE,
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
    /* Socket action */
    yield put({
      type: 'emit new log',
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
    const { skip, limit, tags, author_nickname, star_user_id } = action;
    const { data } = yield call(logApi.list, { skip, limit, tags, author_nickname, star_user_id });
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
    yield put({
      type: PROFILE_LIST_RAW_UPDATE,
      logId,
      updateField: 'stars',
      update: stars,
    });
    yield put({
      type: SEARCH_LOG_RAW_UPDATE,
      logId,
      updateField: 'stars',
      update: stars,
    });
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
    const rawUpdate = {
      logId: comment.thread_id,
      updateField: 'comment_count',
      update: comments && comments.length,
    };
    yield put({
      type: PROFILE_LIST_RAW_UPDATE,
      ...rawUpdate,
    });
    yield put({
      type: SEARCH_LOG_RAW_UPDATE,
      ...rawUpdate,
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
function createSocketChannel(socket) {
  return eventChannel(emit => {
    const newLogHandler = (event) => emit(event);
    socket.on('receive new log', newLogHandler);

    const unsubscribe = () => {
      socket.off('receive new log', newLogHandler);
    };
    return unsubscribe;
  });
}
function* receiveNewLog(socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const payload = yield take(channel);
    yield put({
      type: LOG_NEW_COUNT_UPDATE,
      payload,
    });
  }
}
function* emitNewLog(socket) {
  while (true) {
    const { payload } = yield take('emit new log');
    yield delay(5000);
    yield apply(socket, socket.emit, ['post new log', payload]);
  }
}
function* handleSocket(socket) {
  yield fork(receiveNewLog, socket);
  yield fork(emitNewLog, socket);
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
function* watchLogSocket() {
  while (true) {
    yield take(LOG_SOCKET_CONNECT);
    const socket = yield call(createSocket);
    const socketAction = yield fork(handleSocket, socket);

    yield take(LOG_SOCKET_DISCONNECT);
    yield cancel(socketAction);
  }
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
    fork(watchLogSocket),
  ]);
}
