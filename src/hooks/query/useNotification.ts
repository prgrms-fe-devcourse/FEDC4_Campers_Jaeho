import { useQuery, useMutation } from '@tanstack/react-query';
import { getNotification, createNotification } from '../../apis/Notification';
import { NotificationInfo } from '../../types/social';

export const useNotification = () => {
  const getNewNotification = useQuery(['new', 'notification'], getNotification);

  const createNewNotification = useMutation((notification: NotificationInfo) =>
    createNotification(notification)
  );
  console.log('check');

  return { getNewNotification, createNewNotification };
};
