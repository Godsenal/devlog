import {
  LOG_POST_REQUEST,
  LOG_LIST_REQUEST,
  LOG_GET_REQUEST,
  LOG_STAR_REQUEST,
} from '../constants/actionTypes';

export function postLog(log) {
  return {
    type: LOG_POST_REQUEST,
    log,
  };
}

export function listLog({ skip = 0, limit = 10 }) {
  return {
    type: LOG_LIST_REQUEST,
    skip,
    limit,
  };
}

export function getLog(logId) {
  return {
    type: LOG_GET_REQUEST,
    logId,
  };
}

export function starLog({ logId, userId, isStared = false }) {
  return {
    type: LOG_STAR_REQUEST,
    logId,
    userId,
    isStared,
  };
}
