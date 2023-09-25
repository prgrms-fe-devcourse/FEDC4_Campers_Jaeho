import { logout } from '../../apis/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const postLogout = useMutation(logout, {
    onSuccess() {
      alert('로그아웃 되었습니다!');
    },
  });

  return postLogout;
};
