import { logout } from '../../../apis/auth';
import { useQuery } from '@tanstack/react-query';

export const useLogout = () => {
  const postLogout = useQuery(['logout'], logout);

  return postLogout;
};
