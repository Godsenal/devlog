import { combineReducers } from 'redux';
import environment from './environment';
import user from './user';
import log from './log';
import modal from './modal';
import profile from './profile';
import search from './search';
import toast from './toast';

const appReducer = combineReducers({
  environment,
  log,
  user,
  modal,
  profile,
  search,
  toast,
});
const rootReducer = (state, action) => {
  // initialize state on logout
  if (action.type === 'USER_LOGOUT_REQUEST') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
