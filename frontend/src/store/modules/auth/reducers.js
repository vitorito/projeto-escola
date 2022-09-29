/* eslint-disable default-param-last */
/* eslint-disable no-case-declarations */

import api from '../../../services/api';
import types from './types';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      return newState;
    case types.LOGIN_FAILURE:
      delete api.defaults.headers.Authorization;
      return { ...initialState };
    default:
      return state;
  }
}
