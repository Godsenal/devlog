import { TOAST_ADD, TOAST_DELETE } from '../constants/actionTypes';

export function addToast(timeout, message) {
  return {
    type: TOAST_ADD,
    timeout,
    message,
  };
}

export function deleteToast(id) {
  return {
    type: TOAST_DELETE,
    id,
  };
}
