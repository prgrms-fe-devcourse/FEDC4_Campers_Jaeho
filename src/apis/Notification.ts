import instance from './axios';
import { AxiosError } from 'axios';

export const getNotification = async () => {
  try {
    const { data } = await instance.get('/notifications');

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
