import update from 'immutability-helper';

import {
  TOAST_ADD,
  TOAST_DELETE,
} from '../constants/actionTypes';

const initialState = {
  toasts: [],
  toastId: 0,
};

export default function toast(state = initialState, action) {
  switch (action.type) {
    case TOAST_ADD: {
      const toastId = state.toastId + 1;
      return update(state, {
        toasts: { $push: [{
          id: toastId,
          timeout: action.timeout,
          animation: action.animation,
          message: action.message,
        }] },
        toastId: { $set: toastId },
      });
    }
    case TOAST_DELETE:
      return update(state, {
        toasts: { $set: state.toasts.filter(item => item.id !== action.id) },
      });
    default:
      return state;
  }
}
