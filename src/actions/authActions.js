import * as api from '../api/api.js';

import { AUTH } from './actionTypes.js';

// Action creators

export const signin = (formData, history) => async (dispatch) => {
  try {
    // Log in user
    const { data } = await api.signin(formData);

    dispatch({ type: AUTH, data: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    // Sign up user
    const { data } = await api.signup(formData);
    console.log('Data (in authActions.js): ', data);

    dispatch({ type: AUTH, data: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
}