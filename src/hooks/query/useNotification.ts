import { useQuery } from '@tanstack/react-query';
import { getNotification } from '../../apis/Notification';

export const useNotification = () => {
  const getNewNotification = useQuery(['newNotification'], () =>
    getNotification()
  );

  return getNewNotification;
};
