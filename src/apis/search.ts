import { PostResponse } from './../types/post';
import { ROUTES } from '../constants/routes';
import { User } from '../types/user';
import { AxiosError } from 'axios';
import instance from './axios';

// 메인 데이터 표시
export const searchPosterAll = async (id: string, offset = 0, limit = 0) => {
  try {
    const { data } = await instance.get<PostResponse[]>(`posts/channel/${id}`, {
      params: { offset, limit },
    });

    return data.map(({ title, updatedAt, _id, likes, image }) => ({
      title,
      updatedAt,
      _id,
      likes: likes.length,
      image,
    }));
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error as Error);
    }
  }
};

// 전체 유저 검색
export const searchUserAll = async () => {
  try {
    const { data } = await instance.get('users/get-users');

    return data.map(({ _id, fullName, isOnline }: User) => ({
      _id,
      fullName,
      isOnline,
    }));
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};

// 접속중인 유저 검색 (보류 -선택사항)
export const searchUserOnline = async () => {
  try {
    const { data } = await instance.get('users/online-users');

    return data.map(({ _id, fullName, isOnline }: User) => {
      ({ _id, fullName, isOnline });
    });
  } catch (error) {
    console.error(error as Error);
  }
};

// 유저 info 페이지로 이동
export const searchUser = async (userId: string) => {
  try {
    const {
      data: { _id, fullName, email, posts, followers, following },
    } = await instance.get<User>(`${ROUTES.USER_INFO(userId)}`);

    return { _id, fullName, email, posts, followers, following };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};

// 모든 유저, 포스트 검색
export const getSearchResult = async (keyword: string) => {
  try {
    const { data } = await instance.get<(User | PostResponse)[]>(
      `/search/all/${keyword}`
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
