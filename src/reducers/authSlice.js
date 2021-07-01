import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/actionTypes.js';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data};
    case SIGN_OUT:
      localStorage.clear();
      
      return { ...state, authData: null };
    default:
      return state;
  }
}

export default authReducer;