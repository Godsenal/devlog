import { all, fork, takeLatest, take } from 'redux-saga/effects';
import { MODAL_SHOW, MODAL_CLOSE } from '../constants/actionTypes';

function showModal() {
  document.body.style.overflowY = 'hidden'; // disable background scrolling
}
function* watchShow() {
  yield takeLatest(MODAL_SHOW, showModal);
}
function* watchClose() {
  while (true) {
    yield take(MODAL_CLOSE);
    document.body.style.overflowY = null;// disable background scrolling
  }
}
export default function* root() {
  yield all([
    fork(watchShow),
    fork(watchClose),
  ]);
}
