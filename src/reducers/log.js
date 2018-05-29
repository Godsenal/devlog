import update from 'immutability-helper';

import {
  LOG_POST_REQUEST,
  LOG_POST_SUCCESS,
  LOG_POST_FAILURE,
  LOG_LIST_REQUEST,
  LOG_LIST_SUCCESS,
  LOG_LIST_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  post: {
    status: 'INIT',
    log: {},
    error: 'Error',
  },
  list: {
    status: 'INIT',
    logs: [],
    error: 'Error',
    lastLogId: null,
    limit: 10,
    isLast: false,
  },
};

export default function log(state = initialState, action) {
  switch (action.type) {
    case LOG_POST_REQUEST:
      return update(state, {
        post: {
          status: { $set: 'WAITING' },
        },
      });
    case LOG_POST_SUCCESS:
      return update(state, {
        post: {
          status: { $set: 'SUCCESS' },
          log: { $set: action.log },
        },
      });
    case LOG_POST_FAILURE:
      return update(state, {
        post: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case LOG_LIST_REQUEST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' },
        },
      });
    case LOG_LIST_SUCCESS: {
      const { logs, lastLogId, limit, isLast } = action;
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          logs: { $push: logs },
          isLast: { $set: isLast },
          lastLogId: { $set: lastLogId },
          limit: { $set: limit },
        },
      });
    }
    case LOG_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
}
