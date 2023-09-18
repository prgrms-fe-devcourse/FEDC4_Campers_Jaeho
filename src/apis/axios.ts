import axios from 'axios';
import { getLocalStorage } from '../utils/storage';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token', '');

    if (token.length) {
      config.headers.Authorization = `bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error(error);
  }
);

export default instance;
