import { CREATE, UPDATE, DELETE, FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../actions/actionTypes.js';

const initialPostsState = {
  posts: [],
  currentPage: 0,
  numberOfPages: 0,
  post: null,
  isLoading: true,
  isSearch: false
}

const postsReducer = (postsState = initialPostsState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...postsState, isLoading: true };
    case END_LOADING:
      return { ...postsState, isLoading: false };
    case FETCH_POST:
      return {
        ...postsState,
        post: action.payload.post
      }
    case FETCH_ALL:
      return {
        ...postsState,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        isSearch: false
      };
    case FETCH_BY_SEARCH:
      return {
        ...postsState,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        isSearch: true
      };
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
        posts: postsState.posts.filter((post) => post._id !== action.payload.deletedId)
      };
    default:
      return postsState;
  }
}

export default postsReducer;