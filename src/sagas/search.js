import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  SEARCH_TAG_REQUEST,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILURE,
  SEARCH_PRE_REQUEST,
  SEARCH_PRE_SUCCESS,
  SEARCH_PRE_FAILURE,
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
function* searchTag(action) {
  try {
    const { text } = action;
    const response = yield call(SearchApi.searchTag, text);
    const { tags } = response.data;
    const parseResult = tags.map((tag) => ({
      ...tag,
      value: tag._id,
      key: tag._id,
      text: tag.name,
      description: tag.description,
    }));
    yield put({
      type: SEARCH_TAG_SUCCESS,
      results: parseResult,
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
function* watchSearchTag() {
  yield takeLatest(SEARCH_TAG_REQUEST, searchTag);
}
export default function* root() {
  yield all([
    fork(watchSearchTag),
    fork(watchSearchPre),
  ]);
}
