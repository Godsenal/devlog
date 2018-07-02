import {
  SEARCH_PRE_CLEAR,
  SEARCH_PRE_REQUEST,
  SEARCH_TAG_REQUEST,
  SEARCH_USER_REQUEST,
  SEARCH_LOG_REQUEST,
} from '../constants/actionTypes';

export function searchPreClear() {
  return {
    type: SEARCH_PRE_CLEAR,
  };
}
export function searchPre(q) {
  return {
    type: SEARCH_PRE_REQUEST,
    q,
  };
}

export function searchUser({ skip = 0, limit = 10, q }) {
  return {
    type: SEARCH_USER_REQUEST,
    skip,
    limit,
    q,
  };
}

export function searchLog({ skip = 0, limit = 10, q }) {
  return {
    type: SEARCH_LOG_REQUEST,
    skip,
    limit,
    q,
  };
}

export function searchTag({ skip = 0, limit = 30, q }) {
  return {
    type: SEARCH_TAG_REQUEST,
    skip,
    limit,
    q,
  };
}
