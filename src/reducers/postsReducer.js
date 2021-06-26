import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../actions/actionTypes.js';

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE: 
      return [ ...posts, action.payload ];
    case UPDATE:
      return posts.map((post) => {
        // Update post matching targeted id
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
}

export default postsReducer;