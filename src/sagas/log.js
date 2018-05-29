import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

import {
  LOG_POST_REQUEST,
  LOG_POST_SUCCESS,
  LOG_POST_FAILURE,
  LOG_LIST_REQUEST,
  LOG_LIST_SUCCESS,
  LOG_LIST_FAILURE,
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
    const { lastLogId, limit } = action;
    const { data } = yield call(logApi.list, { lastLogId, limit });
    const { logs } = data;
    const payload = {
      ...data,
      lastLogId: logs.length > 0 ? logs[logs.length - 1]._id : null,
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
function* watchPost() {
  yield takeLatest(LOG_POST_REQUEST, post);
}
function* watchList() {
  yield takeLatest(LOG_LIST_REQUEST, list);
}
/**
 * Log Sagas
 */
export default function* root() {
  yield all([
    fork(watchPost),
    fork(watchList),
  ]);
}
