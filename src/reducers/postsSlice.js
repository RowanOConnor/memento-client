import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH } from '../actions/actionTypes.js';

const initialPosts = {
  posts: [],
  currentPage: 0,
  numberOfPages: 0
}

const postsReducer = (postsState = initialPosts, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...postsState,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    case FETCH_BY_SEARCH:
      return {
        ...postsState,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    case CREATE: 
      return {
        ...postsState,
        posts: [ ...postsState.posts, action.payload.newPost ]
      };
    case UPDATE:
      return {
        ...postsState,
        posts: postsState.posts.map((post) => {
          // Update post matching targeted id
          if (post._id === action.payload.updatedPost._id) {
            return action.payload.updatedPost;
          } else {
            return post;
          }
        })
    };
    case DELETE:
      return {
        ...postsState,
        posts: postsState.posts.filter((post) => post._id !== action.payload)
      };
    default:
      return postsState;
  }
}

export default postsReducer;