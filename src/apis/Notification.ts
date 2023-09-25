import { NotificationResponse } from './../types/user';
import instance from './axios';
import { AxiosError } from 'axios';
import { NotificationInfo } from '../../types/social';

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

// 알람 확인
export const confirmNotification = async () => {
  try {
    await instance.put('notifications/seen');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};

// 알람 생성
export const createNotification = async (
  NotificationInfo: NotificationInfo
) => {
  try {
    await instance.post('notifications/create', NotificationInfo);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
