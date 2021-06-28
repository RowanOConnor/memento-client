import { combineReducers } from 'redux';

import postsReducer from './postsReducer.js';
import authReducer from './authReducer.js';

export default combineReducers({
  posts: postsReducer,
  auth: authReducer
});