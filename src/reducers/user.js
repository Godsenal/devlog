import update from 'immutability-helper';

import * as actionTypes from '../constants/actionTypes';

const initialState = {
  login: {
    status: 'INIT',
    _id: '',
    username: '',
    nickname: '',
    imageUrl: '',
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
    username: {
      status: 'INIT',
      isValid: false,
      message: '',
      error: 'Error',
    },
    nickname: {
      status: 'INIT',
      isValid: false,
      message: '',
      error: 'Error',
    },
  },
  get: {
    status: 'INIT',
    user: {},
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
  image: {
    status: 'INIT',
    imageUrl: '',
    error: '',
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
          imageUrl: { $set: action.imageUrl },
          tags: { $set: action.tags },
          followings: { $set: action.followings },
          bookmarks: { $set: action.bookmarks },
          isAuthenticated: { $set: true },
        },
        verify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actionTypes.USER_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
          username: { $set: '' },
          nickname: { $set: '' },
          imageUrl: { $set: '' },
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
          imageUrl: { $set: action.imageUrl },
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
          [action.field]: {
            status: { $set: 'WAITING' },
          },
        },
      });
    case actionTypes.USER_VALIDATE_SUCCESS:
      return update(state, {
        validate: {
          [action.field]: {
            status: { $set: 'SUCCESS' },
            isValid: { $set: action.isValid },
            message: { $set: action.message },
          },
        },
      });
    case actionTypes.USER_VALIDATE_FAILURE:
      return update(state, {
        validate: {
          [action.field]: {
            status: { $set: 'FAILURE' },
            isValid: { $set: false },
            message: { $set: action.message },
            error: { $set: action.error },
          },
        },
      });
    case actionTypes.USER_SIGNUP_INITIALIZE:
      return update(state, {
        validate: { $set: initialState.validate },
        image: { $set: initialState.image },
        signup: { $set: initialState.signup },
      });
    case actionTypes.USER_GET_REQUEST:
      return update(state, {
        get: {
          status: { $set: 'WAITING' },
        },
      });
    case actionTypes.USER_GET_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          status: 'SUCCESS',
          user: action.user,
        },
      };
    case actionTypes.USER_GET_FAILURE:
      return update(state, {
        get: {
          status: { $set: 'FAILURE' },
          user: { $set: {} },
          error: { $set: action.error },
        },
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
    case actionTypes.USER_FOLLOW_SUCCESS: {
      const followUpdate = {
        follow: {
          status: { $set: 'SUCCESS' },
          followingId: { $set: action.followingId },
        },
        login: {
          followings: { $set: action.followings }, // add only chagned one?
        },
      };
      /* DISCUSS: Need to update immediately? */
      // when user followed profile that user is currently watching.
      if (state.get.user._id && state.get.user._id === action.followingId) {
        followUpdate.get = {
          user: {
            followers: (action.isFollowed ?
              { $apply: followers => followers.filter(follower => follower.nickname !== state.login.nickname) } :
              { $push: [{ _id: action.followingId, nickname: state.login.nickname }] }
            ),
          },
        };
      }
      return update(state, followUpdate);
    }
    case actionTypes.USER_FOLLOW_FAILURE:
      return update(state, {
        follow: {
          status: { $set: 'FAILURE' },
          followingId: { $set: '' },
          error: { $set: action.error },
        },
      });
    case actionTypes.USER_IMAGE_REQUEST: {
      return update(state, {
        image: {
          status: { $set: 'WAITING' },
          imageUrl: { $set: '' },
        },
      });
    }
    case actionTypes.USER_IMAGE_SUCCESS: {
      return update(state, {
        image: {
          status: { $set: 'SUCCESS' },
          imageUrl: { $set: action.imageUrl },
        },
      });
    }
    case actionTypes.USER_IMAGE_FAILURE: {
      return update(state, {
        image: {
          status: { $set: 'FAILURE' },
          imageUrl: { $set: '' },
          error: { $set: action.error },
        },
      });
    }
    default:
      return state;
  }
}
