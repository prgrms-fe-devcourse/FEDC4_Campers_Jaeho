import { ChangeProfileImage, ChangeUserInfo, UserInfo } from '../../apis/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeUserInfo = () => {
  const queryClient = useQueryClient();

  const postProfileImage = useMutation(
    (formData) => ChangeProfileImage(formData!),
    {
      onSuccess() {
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  const putUserInfo = useMutation(
    (params: UserInfo) => ChangeUserInfo(params),
    {
      onSuccess() {
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  return { postProfileImage, putUserInfo };
};
