import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';
import {
  SEARCH_PRE_CLEAR,
  SEARCH_PRE_REQUEST,
  SEARCH_PRE_SUCCESS,
  SEARCH_PRE_FAILURE,
  SEARCH_LOG_REQUEST,
  SEARCH_LOG_SUCCESS,
  SEARCH_LOG_FAILURE,
  SEARCH_LOG_RAW_UPDATE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_TAG_REQUEST,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  pre: {
    status: 'INIT',
    q: '',
    results: {
      users: [],
      tags: [],
      len: 0,
    },
    error: 'Error',
  },
  log: {
    status: 'INIT',
    q: '',
    isLast: false,
    isInit: true,
    logs: [],
    error: 'Error',
  },
  user: {
    status: 'INIT',
    q: '',
    isLast: false,
    isInit: true,
    users: [],
    error: 'Error',
  },
  tag: {
    status: 'INIT',
    q: '',
    isLast: false,
    isInit: true,
    tags: [],
    error: 'Error',
  },
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRE_CLEAR: {
      return update(state, {
        pre: {
          q: { $set: '' },
          results: {
            users: { $set: [] },
            tags: { $set: [] },
            len: { $set: 0 },
          },
        },
      });
    }
    case SEARCH_PRE_REQUEST:
      return update(state, {
        pre: {
          status: { $set: 'WAITING' },
          q: { $set: action.q },
        },
      });
    case SEARCH_PRE_SUCCESS:
      return update(state, {
        pre: {
          status: { $set: 'SUCCESS' },
          results: {
            users: { $set: action.users },
            tags: { $set: action.tags },
            len: { $set: action.len },
          },
        },
      });
    case SEARCH_PRE_FAILURE:
      return update(state, {
        pre: {
          status: { $set: 'FAILURE' },
          results: {
            users: { $set: [] },
            tags: { $set: [] },
            len: { $set: 0 },
          },
          error: { $set: action.error },
        },
      });
    case SEARCH_LOG_REQUEST:
      return update(state, {
        log: {
          status: { $set: 'WAITING' },
          q: { $set: action.q },
          isInit: { $set: action.skip === 0 },
        },
      });
    case SEARCH_LOG_SUCCESS:
      return update(state, {
        log: {
          status: { $set: 'SUCCESS' },
          isInit: { $set: action.isInit },
          isLast: { $set: action.isLast },
          logs: action.isInit ? { $set: action.logs } : { $push: action.logs },
        },
      });
    case SEARCH_LOG_FAILURE:
      return update(state, {
        log: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case SEARCH_LOG_RAW_UPDATE: {
      const logIndex = findIndex(state.log.logs, item => item._id === action.logId);
      let rawUpdate = {};
      const fieldUpdate = { [action.updateField]: { $set: action.update } };
      if (logIndex >= 0) {
        rawUpdate = {
          log: {
            logs: {
              [logIndex]: fieldUpdate,
            },
          },
        };
      }
      return update(state, rawUpdate);
    }
    case SEARCH_USER_REQUEST:
      return update(state, {
        user: {
          status: { $set: 'WAITING' },
          q: { $set: action.q },
          isInit: { $set: action.skip === 0 },
        },
      });
    case SEARCH_USER_SUCCESS:
      return update(state, {
        user: {
          status: { $set: 'SUCCESS' },
          isInit: { $set: action.isInit },
          isLast: { $set: action.isLast },
          users: action.isInit ? { $set: action.users } : { $push: action.users },
        },
      });
    case SEARCH_USER_FAILURE:
      return update(state, {
        user: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case SEARCH_TAG_REQUEST:
      return update(state, {
        tag: {
          status: { $set: 'WAITING' },
          q: { $set: action.q },
          isInit: { $set: action.skip === 0 },
        },
      });
    case SEARCH_TAG_SUCCESS:
      return update(state, {
        tag: {
          status: { $set: 'SUCCESS' },
          isInit: { $set: action.isInit },
          isLast: { $set: action.isLast },
          tags: action.isInit ? { $set: action.tags } : { $push: action.tags },
        },
      });
    case SEARCH_TAG_FAILURE:
      return update(state, {
        tag: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
}
