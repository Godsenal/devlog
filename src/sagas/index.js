import { all, fork } from 'redux-saga/effects';

import modal from './modal';
import user from './user';
import search from './search';

export default function* root() {
  yield all([
    fork(modal),
    fork(user),
    fork(search),
  ]);
}
