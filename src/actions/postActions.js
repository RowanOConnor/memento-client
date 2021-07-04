import * as api from '../api/api.js';

import {
  FETCH_POST,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  START_LOADING,
  END_LOADING
} from './actionTypes.js';

// Action Creators
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { post } } = await api.fetchPost(id);

    dispatch({
      type: FETCH_POST,
      payload: {
        post: post
      }
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { posts, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({
      type: FETCH_ALL,
      payload: {
        posts: posts,
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const getPostsBySearch = (searchQuery, page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { posts, currentPage, numberOfPages } } = await api.fetchPostsBySearch(searchQuery, page);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: {
        posts: posts,
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { newPost } } = await api.createPost(post);

    dispatch({
      type: CREATE,
      payload: {
        newPost: newPost
      }
    });
    dispatch({ type: END_LOADING });
    history.push(`/posts/${newPost._id}`);
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data: { updatedPost } } = await api.updatePost(id, post);

    dispatch({
      type: UPDATE,
      payload: {
        updatedPost: updatedPost
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({
      type: DELETE,
      payload: {
        deletedId: id
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data: { updatedPost } } = await api.likePost(id);

    dispatch({
      type: LIKE,
      payload: {
        updatedPost: updatedPost
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const commentOnPost = (id, comment) => async (dispatch) => {
  try {
    const { data: { updatedPost } } = await api.commentOnPost(id, { comment: comment });

    dispatch({
      type: COMMENT,
      payload: {
        updatedPost: updatedPost
      }
    })
  } catch (error) {
    console.log(error);
  }
}