import { all, fork, put, takeLatest, take } from 'redux-saga/effects';
import { MODAL_SHOW, USER_VALIDATE_INITIALIZE, MODAL_CLOSE } from '../constants/actionTypes';

function* showModal(action) {
  document.body.style.overflowY = 'hidden'; // disable background scrolling
  if (action.modalType === 'SIGNUP_MODAL') {
    yield put({ type: USER_VALIDATE_INITIALIZE });
  }
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
