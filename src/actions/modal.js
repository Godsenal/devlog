import {
  MODAL_SHOW,
  MODAL_CLOSE,
} from '../constants/actionTypes';

export function showModal(modalType, modalProps = {}) {
  return {
    type: MODAL_SHOW,
    modalType,
    modalProps,
  };
}

export function closeModal() {
  return {
    type: MODAL_CLOSE,
  };
}
