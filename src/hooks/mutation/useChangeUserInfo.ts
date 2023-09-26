import { User } from './../../types/user';
import { ChangeProfileImage, ChangeUserInfo, UserInfo } from '../../apis/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeUserInfo = () => {
  const queryClient = useQueryClient();

  const postProfileImage = useMutation<User | undefined, unknown, FormData>(
    (formData) => ChangeProfileImage(formData!),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(['user', 'all']);
        queryClient.invalidateQueries(['search', 'user', data?._id]);
      },
    }
  );

  const putUserInfo = useMutation(
    (params: UserInfo) => ChangeUserInfo(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(['user', 'all']);
        queryClient.invalidateQueries(['search', 'user', data?._id]);
      },
    }
  );

  return { postProfileImage, putUserInfo };
};
