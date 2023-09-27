import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotification, createNotification } from '../../apis/Notification';
import { NotificationInfo } from '../../types/social';

export const useNotification = () => {
  const queryClient = useQueryClient();

  const getNewNotification = useQuery(['new', 'notification'], getNotification);

  const createNewNotification = useMutation(
    (notification: NotificationInfo) => createNotification(notification),
    {
      onSuccess() {
        queryClient.invalidateQueries(['new', 'notification']);
      },
    }
  );

  return { getNewNotification, createNewNotification };
};
