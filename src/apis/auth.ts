import instance from './axios';
import { removeLocalStorage } from '../utils/storage';
import { AxiosError } from 'axios';
import { User } from '../types/user';
import { SignInValues, SignResponseData, SignUpValues } from '../types/auth';

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
