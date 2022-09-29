/* eslint-disable no-unused-vars */
import { get } from 'lodash';
import { all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import types from './types';

// function* loginRequest({ payload }) {
//   try {
//     const { email, password } = payload;
//     const response = yield call(api.post, '/login', { email, password });
//     yield put(actions.loginSuccess({ ...response.data }));
//     toast.success('Login success');

//     api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
//   } catch (error) {
//     toast.error('Invalid email or password');
//     yield put(actions.loginFailure());
//   }
// }

function addAuthorizationHeader({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.PERSIST_REHYDRATE, addAuthorizationHeader),
  takeLatest(types.LOGIN_SUCCESS, addAuthorizationHeader),
]);
