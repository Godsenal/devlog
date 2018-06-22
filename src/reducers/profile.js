import update from 'immutability-helper';
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
    default:
      return state;
  }
}

