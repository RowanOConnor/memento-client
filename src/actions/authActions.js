import * as api from '../api/api.js';

import { SIGN_IN, SIGN_UP } from './actionTypes.js';

// Action creators
export const signIn = (formData, history) => async (dispatch) => {
  try {
    // Log in user
    const { data } = await api.signin(formData);

    dispatch({ type: SIGN_IN, data: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // Sign up user
    const { data } = await api.signup(formData);

    dispatch({ type: SIGN_UP, data: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
}