import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';

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
  LOG_POST_COMMENT_REQUEST,
  LOG_POST_COMMENT_SUCCESS,
  LOG_POST_COMMENT_FAILURE,
  LOG_RAW_UPDATE,
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
  comment: {
    status: 'INIT',
    comment: {},
    comments: [],
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
    case LOG_LIST_REQUEST: {
      const listUpdate = {
        status: { $set: 'WAITING' },
      };
      if (action.skip === 0) {
        listUpdate.logs = { $set: [] };
      }
      // skip == 0 means this is first time request.
      // so clear exist logs
      return update(state, {
        list: listUpdate,
      });
    }
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
      const starUpdate = {
        star: {
          status: { $set: 'SUCCESS' },
          stars: { $set: action.stars },
          count: { $set: action.stars.length },
        },
      };
      const listIndex = findIndex(state.list.logs, item => item._id === action.logId);
      const isCurrent = state.get.log._id === action.logId;

      if (listIndex >= 0) { // star update when log is in list.
        starUpdate.list = {
          logs: {
            [listIndex]: {
              stars: { $set: action.stars },
            },
          },
        };
      }
      if (isCurrent) { // star update for current log when user see this log.
        starUpdate.get = {
          log: {
            stars: { $set: action.stars },
          },
        };
      }
      return update(state, starUpdate);
    }
    case LOG_STAR_FAILURE:
      return update(state, {
        star: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case LOG_POST_COMMENT_REQUEST:
      return update(state, {
        comment: {
          status: { $set: 'WAITING' },
        },
      });
    case LOG_POST_COMMENT_SUCCESS: {
      const listIndex = findIndex(state.list.logs, item => item._id === action.comment.thread_id);
      const isCurrent = state.get.log._id === action.comment.thread_id;
      const commentUpdate = {
        comment: {
          status: { $set: 'SUCCESS' },
          comment: { $set: action.comment },
        },
      };
      if (listIndex >= 0) {
        commentUpdate.list = {
          logs: {
            [listIndex]: {
              comment_count: { $set: action.comments.length },
            },
          },
        };
      }
      if (isCurrent) {
        commentUpdate.get = {
          log: {
            comments: { $set: action.comments },
          },
        };
      }
      return update(state, commentUpdate);
    }
    case LOG_POST_COMMENT_FAILURE:
      return update(state, {
        comment: {
          status: { $set: 'FAILURE' },
          comments: { $set: [] },
          comment: { $set: {} },
          error: { $set: action.error },
        },
      });
    case LOG_RAW_UPDATE: { // reducer for make raw updating for log when fetched new data.
      const listIndex = findIndex(state.list.logs, item => item._id === action.logId);
      const isCurrent = state.get.log._id === action.logId;
      const rawUpdate = {};
      if (listIndex >= 0) { // star update when log is in list.
        rawUpdate.list = {
          logs: {
            [listIndex]: {
              [action.updateField]: { $set: action.update },
            },
          },
        };
      }
      if (isCurrent) { // star update for current log when user see this log.
        rawUpdate.get = {
          log: {
            [action.updateField]: { $set: action.update },
          },
        };
      }
      return update(state, rawUpdate);
    }
    default:
      return state;
  }
}
