import {
  PROFILE_LATEST_REQUEST,
  PROFILE_STARS_REQUEST,
} from '../constants/actionTypes';

export function listLatest({ skip = 0, limit = 10, listType = 'latest', author_nickname }) {
  return {
    type: PROFILE_LATEST_REQUEST,
    skip,
    limit,
    listType,
    author_nickname,
  };
}

export function listStars({ skip = 0, limit = 10, listType = 'stars', star_user_id }) {
  return {
    type: PROFILE_STARS_REQUEST,
    skip,
    limit,
    listType,
    star_user_id,
  };
}
