import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);
