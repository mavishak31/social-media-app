import axios from 'axios';

export const API_BASE_URL =
  'https://be-social-media-api-production.up.railway.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;

  const token = localStorage.getItem('sociality_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
