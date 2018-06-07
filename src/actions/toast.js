import { TOAST_ADD, TOAST_DELETE } from '../constants/actionTypes';

export function addToast(toastProps = {}) {
  return {
    type: TOAST_ADD,
    toastProps,
  };
}

export function deleteToast(id) {
  return {
    type: TOAST_DELETE,
    id,
  };
}
