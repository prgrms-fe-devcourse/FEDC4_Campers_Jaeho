import { isAxiosError } from 'axios';

import { ROUTES } from '../constants/routes';
import { axiosInterface } from './axios';
import { setLocalStorage, removeLocalStorage } from '../utils/storage';

interface LoginParams {
  email: string;
  password: string;
}

interface SignupParams {
  email: string;
  fullName: string;
  password: string;
}

// 회원가입
export const signup = async ({ email, fullName, password }: SignupParams) => {
  try {
    await axiosInterface.post('signup', {
      email,
      fullName,
      password,
    });
  } catch (error) {
    console.error(error.message);
  }
};

// 로그인
export const login = async ({ email, password }: LoginParams) => {
  try {
    const {
      data: { user, token },
    } = await axiosInterface.post('login', {
      email,
      password,
    });
    token && setLocalStorage('token', token);
    return user;
  } catch (error) {
    console.error(error);
    if (error && isAxiosError(error)) {
      // 에러가 있으면 에러 메세지 표시 후 return으로 전달
      console.error(error.message);
    }
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const { status } = await axiosInterface.post('logout');
    if (status === 200) {
      removeLocalStorage('token');
      location.href = ROUTES.MAIN;
    }
  } catch (error) {
    console.error(error);
  }
};

// 인증된 사용자 확인
export const checkAuth = async () => {
  const { data: user } = await axiosInterface.get('auth-user');
  return user;
};
