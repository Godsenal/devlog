import update from 'immutability-helper';

import * as actionTypes from '../constants/actionTypes';

const initialState = {
  login: {
    status: 'INIT',
    _id: '',
    username: '',
    nickname: '',
    tags: [],
    bookmarks: [],
    followings: [],
    isAuthenticated: false,
    error: 'Error',
  },
  signup: {
    status: 'INIT',
    username: '',
    nickname: '',
    error: 'Error',
  },
  verify: {
    status: 'INIT',
    error: 'Error',
  },
  validate: {
    status: 'INIT',
    isValid: false,
    message: '',
    error: 'Error',
  },
  bookmark: {
    status: 'INIT',
    bookmark: '',
    error: 'Error',
  },
  follow: {
    status: 'INIT',
    followingId: '',
    error: 'Error',
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case actionTypes.USER_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
          _id: { $set: action._id },
          username: { $set: action.username },
          nickname: { $set: action.nickname },
          tags: { $set: action.tags },
          followings: { $set: action.followings },
          bookmarks: { $set: action.bookmarks },
          isAuthenticated: { $set: true },
        },
      });
    case actionTypes.USER_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
          username: { $set: '' },
          nickname: { $set: '' },
          tags: { $set: [] },
          followings: { $set: [] },
          bookmarks: { $set: [] },
          isAuthenticated: { $set: false },
          error: { $set: action.error },
        },
      });
    case actionTypes.USER_LOGOUT_SUCCESS:
      return update(state, {
        login: { $set: initialState.login },
      });
    case actionTypes.USER_SIGNUP_REQUEST:
      return update(state, {
        signup: {
          status: { $set: 'WAITING' },
          username: { $set: action.username },
          nickname: { $set: action.nickname },
        },
      });
    case actionTypes.USER_SIGNUP_SUCCESS:
      return update(state, {
        signup: {
          status: { $set: 'SUCCESS' },
          username: { $set: action.username },
          nickname: { $set: action.nickname },
        },
      });
    case actionTypes.USER_SIGNUP_FAILURE:
      return update(state, {
        signup: {
          status: { $set: 'FAILURE' },
          username: { $set: '' },
          nickname: { $set: '' },
          error: { $set: action.error },
        },
      });
    case actionTypes.USER_VERIFY_REQUEST:
      return update(state, {
        verify: {
          status: { $set: 'WAITING' },
        },
      });
    case actionTypes.USER_VERIFY_SUCCESS:
      return update(state, {
        login: {
          _id: { $set: action._id },
          username: { $set: action.username },
          nickname: { $set: action.nickname },
          tags: { $set: action.tags },
          followings: { $set: action.followings },
          bookmarks: { $set: action.bookmarks },
          isAuthenticated: { $set: true },
        },
        verify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actionTypes.USER_VERIFY_FAILURE:
      return update(state, {
        login: { $set: initialState.login },
        verify: {
          status: { $set: 'FAILURE' },
        },
      });
    case actionTypes.USER_VALIDATE_REQUEST:
      return update(state, {
        validate: {
          status: { $set: 'WAITING' },
          message: { $set: '' },
        },
      });
    case actionTypes.USER_VALIDATE_SUCCESS:
      return update(state, {
        validate: {
          status: { $set: 'SUCCESS' },
          isValid: { $set: true },
          message: { $set: action.message },
        },
      });
    case actionTypes.USER_VALIDATE_FAILURE:
      return update(state, {
        validate: {
          status: { $set: 'FAILURE' },
          isValid: { $set: false },
          message: { $set: action.message },
        },
      });
    case actionTypes.USER_VALIDATE_INITIALIZE:
      return update(state, {
        validate: { $set: initialState.validate },
      });
    case actionTypes.USER_BOOKMARK_REQUEST:
      return update(state, {
        bookmark: {
          status: { $set: 'WAITING' },
        },
      });
    case actionTypes.USER_BOOKMARK_SUCCESS:
      return update(state, {
        bookmark: {
          status: { $set: 'SUCCESS' },
          bookmark: { $set: action.bookmark },
        },
        login: {
          bookmarks: { $set: action.bookmarks }, // add only chagned one?
        },
      });
    case actionTypes.USER_BOOKMARK_FAILURE:
      return update(state, {
        bookmark: {
          status: { $set: 'FAILURE' },
          bookmark: { $set: '' },
          error: { $set: action.error },
        },
      });
    case actionTypes.USER_FOLLOW_REQUEST:
      return update(state, {
        follow: {
          status: { $set: 'WAITING' },
        },
      });
    case actionTypes.USER_FOLLOW_SUCCESS:
      return update(state, {
        follow: {
          status: { $set: 'SUCCESS' },
          followingId: { $set: action.followingId },
        },
        login: {
          followings: { $set: action.followings }, // add only chagned one?
        },
      });
    case actionTypes.USER_FOLLOW_FAILURE:
      return update(state, {
        follow: {
          status: { $set: 'FAILURE' },
          followingId: { $set: '' },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
}
