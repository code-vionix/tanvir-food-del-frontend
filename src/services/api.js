import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_URL || 'https://food-del-app.codevionix.com/api',
});

// Automatically attach token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // JWT token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
