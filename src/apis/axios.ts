import axios from 'axios';
import { getLocalStorage } from '../utils/storage';

const instanse = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instanse.interceptors.request.use(
  (config) => {
    const storagedValue = getLocalStorage('token', '');
    if (storagedValue.trim().length > 1) {
      config.headers.Authorization = `bearer ${storagedValue}`;
    }
    return config;
  },
  (error) => {
    // error 로직 설정
    // 요청 오류시 표시
    console.error(error);
  }
);

export default instanse;
