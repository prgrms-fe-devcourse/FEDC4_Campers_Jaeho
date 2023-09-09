import axios from 'axios';
import { getStorage } from '../utils/storage';

export const axiosInterface = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

axiosInterface.interceptors.request.use(
  (config) => {
    console.log(config);
    const storageValue = getStorage('token', '');
    if (storageValue.trim().length > 1) {
      config.headers.Authorization = `bearer ${storageValue}`;
    }
    return config;
  },
  (error) => {
    // error 로직 설정
    // 요청 오류시 표시
    console.error(error);
  }
);

axiosInterface.interceptors.response.use(
  (config) => config,
  (error) => {
    // 200번대가 아닐시 로직 정의
    // 오류시 메인 페이지 이동 ? modal로 표시?
    console.error(error);
  }
);
