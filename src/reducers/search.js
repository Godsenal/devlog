import update from 'immutability-helper';

import {
  SEARCH_TAG_REQUEST,
  SEARCH_TAG_SUCCESS,
  SEARCH_TAG_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  tag: {
    status: 'INIT',
    text: '',
    results: [],
    error: 'Error',
  },
};

export default function search(state = initialState, action) {
  switch (action.type) {
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
