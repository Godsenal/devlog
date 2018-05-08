import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  SEARCH_TAG_REQUEST,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILURE,
} from '../constants/actionTypes';
import * as SearchApi from '../api/search';

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
function* watchSearchTag() {
  yield takeLatest(SEARCH_TAG_REQUEST, searchTag);
}
export default function* root() {
  yield all([
    fork(watchSearchTag),
  ]);
}
