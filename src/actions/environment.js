import {
  ENVIRONMENT_RESIZE,
} from '../constants/actionTypes';

export function resize() {
  return ({
    type: ENVIRONMENT_RESIZE,
  });
}
