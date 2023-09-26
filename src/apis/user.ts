import { AxiosError } from 'axios';
import { User } from '../types/user';
import instance from './axios';

export type UserInfo = {
  fullName: string;
  username: string;
};

// 프로필 이미지 변경
export const ChangeProfileImage = async (formData: FormData) => {
  try {
    const { data } = await instance.post<User>('users/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};

// 내 정보 변경
export const ChangeUserInfo = async ({
  fullName: name,
  username,
}: UserInfo) => {
  try {
    const {
      data: { _id, fullName, email, posts, followers, following },
    }: { data: User } = await instance.put('/settings/update-user', {
      fullName: name,
      username,
    });

    return { _id, fullName, email, posts, followers, following };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
