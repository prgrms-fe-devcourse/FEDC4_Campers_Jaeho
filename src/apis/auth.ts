import instance from './axios';
import { ROUTES } from '../constants/routes';
import { removeLocalStorage } from '../utils/storage';
import { SignInValues, SignResponseData, SignUpValues } from '../types/auth';
import { AxiosError } from 'axios';
import { User } from '../types/user';

export const signup = async ({
  email,
  fullName,
  password,
}: SignUpValues): Promise<SignResponseData | string | void> => {
  try {
    const { data } = await instance.post<SignResponseData>('signup', {
      email,
      fullName,
      password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const signin = async ({
  email,
  password,
}: SignInValues): Promise<SignResponseData | string | void> => {
  try {
    const { data } = await instance.post<SignResponseData>('login', {
      email,
      password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const logout = async () => {
  const { status } = await instance.post('logout');

  if (status === 200) {
    removeLocalStorage('token');
    location.href = ROUTES.MAIN;
  }
};

export const checkAuth = async (): Promise<User | void> => {
  try {
    const { data } = await instance.get<User>('auth-user');

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
