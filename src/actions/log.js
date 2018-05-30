import {
  LOG_POST_REQUEST,
  LOG_LIST_REQUEST,
} from '../constants/actionTypes';

export function postLog(log) {
  return {
    type: LOG_POST_REQUEST,
    log,
  };
}

export function listLog({ skip = 0, limit = 10 }) {
  return {
    type: LOG_LIST_REQUEST,
    skip,
    limit,
  };
}
