import axios from 'axios';

// const baseURL = 'https://safe-mountain-36141.herokuapp.com';
const baseURL = 'http://localhost:5000';

const API = axios.create({ baseURL: baseURL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// Posts
export const fetchPosts         =                (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch =   (searchQuery, page) => API.get(`/posts/search?page=${page}&q=${searchQuery.q || 'none'}&tags=${searchQuery.tags}`);
export const createPost         =             (newPost) => API.post('/posts', newPost);
export const updatePost         = (postId, updatedPost) => API.patch(`/posts/${postId}`, updatedPost);
export const deletePost         =              (postId) => API.delete(`/posts/${postId}`);
export const likePost           =              (postId) => API.patch(`/posts/${postId}/like`);

// Auth
export const signin = (formData) => API.post(`/users/signin`, formData);
export const signup = (formData) => API.post(`/users/signup`, formData);