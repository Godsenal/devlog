import {
  SEARCH_TAG_REQUEST,
} from '../constants/actionTypes';

export function searchTag(text) {
  return {
    type: SEARCH_TAG_REQUEST,
    text,
  };
}
