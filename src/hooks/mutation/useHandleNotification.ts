import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  confirmNotification,
  createNotification,
} from '../../apis/Notification';
import { NotificationInfo } from '../../types/social';

export const useHandleNotification = () => {
  const queryClient = useQueryClient();

  const getConfirmNotification = useMutation(confirmNotification);

  const postCreateNotification = useMutation(
    (NotificationInfo: NotificationInfo) =>
      createNotification(NotificationInfo),
    {
      onSuccess() {
        queryClient.invalidateQueries(['new', 'notification']);
      },
    }
  );

  return { getConfirmNotification, postCreateNotification };
};
