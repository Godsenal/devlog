import update from 'immutability-helper';

import {
  SEARCH_TAG_REQUEST,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILURE,
  SEARCH_PRE_REQUEST,
  SEARCH_PRE_SUCCESS,
  SEARCH_PRE_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  pre: {
    status: 'INIT',
    q: '',
    results: {
      users: [],
      logs: [],
    },
    error: 'Error',
  },
  tag: {
    status: 'INIT',
    text: '',
    results: [],
    error: 'Error',
  },
};

export default function search(state = initialState, action) {
  switch (action.type) {
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
            logs: { $set: action.logs },
          },
        },
      });
    case SEARCH_PRE_FAILURE:
      return update(state, {
        pre: {
          status: { $set: 'FAILURE' },
          results: {
            users: { $set: [] },
            logs: { $set: [] },
          },
          error: { $set: action.error },
        },
      });
    case SEARCH_TAG_REQUEST:
      return update(state, {
        tag: {
          status: { $set: 'WAITING' },
          text: { $set: action.text },
        },
      });
    case SEARCH_TAG_SUCCESS:
      return update(state, {
        tag: {
          status: { $set: 'SUCCESS' },
          results: { $set: action.results },
        },
      });
    case SEARCH_TAG_FAILURE:
      return update(state, {
        tag: {
          status: { $set: 'FAILURE' },
          results: { $set: [] },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
}
