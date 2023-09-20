import { AxiosError } from 'axios';
import { SearchUserParams } from './search';
import instance from './axios';

type UserInfo = {
  fullName: string;
  username: string;
};

// 프로필 이미지 변경
export const ChangeProfileImage = async (formData: FormData) => {
  try {
    const { data } = await instance.post('/users/upload-photo', formData);
    return data.image;
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

// 내 정보 변경
export const ChangeUserInfo = async ({
  fullName: name,
  username,
}: UserInfo) => {
  try {
    const {
      data: { _id, fullName, email, posts, followers, followings },
    }: SearchUserParams = await instance.put('/settings/update-user', {
      fullName: name,
      username,
    });

    return { _id, fullName, email, posts, followers, followings };
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
