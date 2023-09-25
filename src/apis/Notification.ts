import { NotificationResponse } from './../types/user';
import instance from './axios';
import { AxiosError } from 'axios';

export const getNotification = async () => {
  try {
    const { data } = await instance.get<NotificationResponse[] | null>(
      '/notifications'
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
