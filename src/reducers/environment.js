import update from 'immutability-helper';

import * as actionTypes from '../constants/actionTypes';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth < 800,
};

export default function environment(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ENVIRONMENT_RESIZE:
      return update(state, {
        width: { $set: window.innerWidth },
        height: { $set: window.innerHeight },
        isMobile: { $set: window.innerWidth < 800 },
      });
    default:
      return state;
  }
}

