import * as api from '../api/api.js';

import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH } from './actionTypes.js';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data: { posts, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({
      type: FETCH_ALL,
      payload: {
        posts: posts,
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const getPostsBySearch = (searchQuery, page) => async (dispatch) => {
  try {
    const { data: { posts, currentPage, numberOfPages } } = await api.fetchPostsBySearch(searchQuery, page);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: {
        posts: posts,
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data: { newPost } } = await api.createPost(post);

    dispatch({
      type: CREATE,
      payload: {
        newPost: newPost
      }
    });
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
      type: UPDATE,
      payload: {
        updatedPost: updatedPost
      }
    });
  } catch (error) {
    console.log(error);
  }
}