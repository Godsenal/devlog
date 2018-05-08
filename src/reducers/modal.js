import update from 'immutability-helper';

import * as actionTypes from '../constants/actionTypes';

const initialState = {
  modalType: '',
  modalProps: {},
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MODAL_SHOW:
      return update(state, {
        modalType: { $set: action.modalType },
        modalProps: { $set: action.modalProps },
      });
    case actionTypes.MODAL_CLOSE:
      return update(state, {
        $set: initialState,
      });
    default:
      return state;
  }
}
