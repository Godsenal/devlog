import update from 'immutability-helper';

import {
  LOG_POST_REQUEST,
  LOG_POST_SUCCESS,
  LOG_POST_FAILURE,
  LOG_LIST_REQUEST,
  LOG_LIST_SUCCESS,
  LOG_LIST_FAILURE,
  LOG_GET_REQUEST,
  LOG_GET_SUCCESS,
  LOG_GET_FAILURE,
  LOG_STAR_REQUEST,
  LOG_STAR_SUCCESS,
  LOG_STAR_FAILURE,
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
    limit: 10,
    isLast: false,
  },
  get: {
    status: 'INIT',
    log: {},
    error: 'Error',
  },
  star: {
    status: 'INIT',
    stars: [],
    count: 0,
    error: 'Error',
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
        list: {
          logs: { $unshift: [action.log] },
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
      const { logs, limit, isInit, isLast } = action;
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          logs: isInit ? { $set: logs } : { $push: logs },
          isLast: { $set: isLast },
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
    case LOG_GET_REQUEST:
      return update(state, {
        get: {
          status: { $set: 'WAITING' },
        },
      });
    case LOG_GET_SUCCESS: {
      return update(state, {
        get: {
          status: { $set: 'SUCCESS' },
          log: { $set: action.log },
        },
      });
    }
    case LOG_GET_FAILURE:
      return update(state, {
        get: {
          status: { $set: 'FAILURE' },
          log: { $set: {} },
        },
      });
    case LOG_STAR_REQUEST:
      return update(state, {
        star: {
          status: { $set: 'WAITING' },
        },
      });
    case LOG_STAR_SUCCESS: {
      return update(state, {
        star: {
          status: { $set: 'SUCCESS' },
          stars: { $set: action.stars },
          count: { $set: action.stars.length },
        },
      });
    }
    case LOG_STAR_FAILURE:
      return update(state, {
        star: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
}
