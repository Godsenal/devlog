import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  latest: {
    status: 'INIT',
    logs: [],
    error: '',
    limit: 10,
    isLast: false,
  },
  stars: {
    status: 'INIT',
    logs: [],
    error: '',
    limit: 10,
    isLast: false,
  },
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PROFILE_LATEST_REQUEST:
    case actionTypes.PROFILE_STARS_REQUEST:
      return update(state, {
        [action.listType]: {
          status: { $set: 'WAITING' },
        },
      });
    case actionTypes.PROFILE_LATEST_SUCCESS:
    case actionTypes.PROFILE_STARS_SUCCESS: {
      const { isInit, logs, isLast, limit } = action;
      return update(state, {
        [action.listType]: {
          status: { $set: 'SUCCESS' },
          logs: isInit ? { $set: logs } : { $push: logs },
          isLast: { $set: isLast },
          limit: { $set: limit },
        },
      });
    }
    case actionTypes.PROFILE_LATEST_FAILURE:
    case actionTypes.PROFILE_STARS_FAILURE:
      return update(state, {
        [action.listType]: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case actionTypes.PROFILE_LIST_RAW_UPDATE: {
      const latestIndex = findIndex(state.latest.logs, item => item._id === action.logId);
      const starsIndex = findIndex(state.stars.logs, item => item._id === action.logId);
      let rawUpdate = {};
      const fieldUpdate = { [action.updateField]: { $set: action.update } };
      if (latestIndex >= 0) {
        rawUpdate = {
          ...rawUpdate,
          latest: {
            logs: {
              [latestIndex]: fieldUpdate,
            },
          },
        };
      }
      if (starsIndex >= 0) {
        rawUpdate = {
          ...rawUpdate,
          stars: {
            logs: {
              [starsIndex]: fieldUpdate,
            },
          },
        };
      }
      return update(state, rawUpdate);
    }
    default:
      return state;
  }
}
