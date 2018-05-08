import { combineReducers } from 'redux';
import environment from './environment';
import user from './user';
import modal from './modal';
import search from './search';
import toast from './toast';

const rootReducer = combineReducers({
  environment,
  user,
  modal,
  search,
  toast,
});

export default rootReducer;
