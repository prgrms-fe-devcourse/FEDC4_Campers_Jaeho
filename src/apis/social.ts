import instance from './axios';
import { AxiosError } from 'axios';

export const CreateRecommend = async (postId: string) => {
  try {
    await instance.post('likes/create', { postId });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
