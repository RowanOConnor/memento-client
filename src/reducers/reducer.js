import { combineReducers } from 'redux';

import postsReducer from './postsSlice.js';
import authReducer from './authSlice.js';

export default combineReducers({
  posts: postsReducer,
  auth: authReducer
});