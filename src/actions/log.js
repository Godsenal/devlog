import {
  LOG_POST_REQUEST,
  LOG_LIST_REQUEST,
  LOG_GET_REQUEST,
  LOG_STAR_REQUEST,
  LOG_POST_COMMENT_REQUEST,
  LOG_LIST_COMMENT_REQUEST,
  LOG_SOCKET_CONNECT,
  LOG_SOCKET_DISCONNECT,
  LOG_RAW_UPDATE,
} from '../constants/actionTypes';

export function postLog(log) {
  return {
    type: LOG_POST_REQUEST,
    log,
  };
}

export function listLog({ skip = 0, limit = 10, tags, author_nickname, star_user_id }) {
  return {
    type: LOG_LIST_REQUEST,
    skip,
    limit,
    tags,
    author_nickname,
    star_user_id,
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

export function postCommentLog(comment) {
  return {
    type: LOG_POST_COMMENT_REQUEST,
    comment,
  };
}

export function listCommentLog(logId) {
  return {
    type: LOG_LIST_COMMENT_REQUEST,
    logId,
  };
}

export function connectSocket() {
  return {
    type: LOG_SOCKET_CONNECT,
  };
}
export function disconnectSocket() {
  return {
    type: LOG_SOCKET_DISCONNECT,
  };
}

export function rawUpdateLog({ logId, updateField, update }) {
  return {
    type: LOG_RAW_UPDATE,
    logId,
    updateField,
    update,
  };
}
