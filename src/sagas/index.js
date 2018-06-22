import { all, fork } from 'redux-saga/effects';

import log from './log';
import modal from './modal';
import user from './user';
import profile from './profile';
import search from './search';

export default function* root() {
  yield all([
    fork(log),
    fork(modal),
    fork(user),
    fork(profile),
    fork(search),
  ]);
}
