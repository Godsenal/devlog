import { combineReducers } from 'redux';
import environment from './environment';
import user from './user';
import log from './log';
import modal from './modal';
import profile from './profile';
import search from './search';
import toast from './toast';

const rootReducer = combineReducers({
  environment,
  log,
  user,
  modal,
  profile,
  search,
  toast,
});

export default rootReducer;
