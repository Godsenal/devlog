import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { MODAL_SHOW, USER_VALIDATE_INITIALIZE } from '../constants/actionTypes';

function* showModal(action) {
  if (action.modalType === 'SIGNUP_MODAL') {
    yield put({ type: USER_VALIDATE_INITIALIZE });
  }
}
function* watchShow() {
  yield takeLatest(MODAL_SHOW, showModal);
}
export default function* root() {
  yield all([
    fork(watchShow),
  ]);
}
