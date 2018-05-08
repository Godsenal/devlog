import update from 'immutability-helper';

import * as actionTypes from '../constants/actionTypes';

const initialState = {
  login: {
    status: 'INIT',
    _id: '',
    username: '',
    nickname: '',
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
          isAuthenticated: { $set: true },
        },
      });
    case actionTypes.USER_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
          username: { $set: '' },
          nickname: { $set: '' },
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
    case actionTypes.USER_VERIFY_SUCCESS:
      return update(state, {
        login: {
          _id: { $set: action._id },
          username: { $set: action.username },
          nickname: { $set: action.nickname },
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
    default:
      return state;
  }
}
