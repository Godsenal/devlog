import {
  PROFILE_LATEST_REQUEST,
  PROFILE_STARS_REQUEST,
  PROFILE_BOOKMARKS_REQUEST,
  PROFILE_FOLLOWER_REQUEST,
  PROFILE_FOLLOWING_REQUEST,
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

export function listBookmarks({ skip = 0, limit = 10, listType = 'bookmarks' }) {
  return {
    type: PROFILE_BOOKMARKS_REQUEST,
    skip,
    limit,
    listType,
  };
}

export function listFollowing({ skip = 0, limit = 10, nickname }) {
  return {
    type: PROFILE_FOLLOWING_REQUEST,
    skip,
    limit,
    nickname,
  };
}

export function listFollower({ skip = 0, limit = 10, nickname }) {
  return {
    type: PROFILE_FOLLOWER_REQUEST,
    skip,
    limit,
    nickname,
  };
}
