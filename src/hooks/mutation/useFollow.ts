import { createFollow, deleteFollow } from './../../apis/social';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFollow = () => {
  const queryClient = useQueryClient();

  const createPostFollow = useMutation(
    (userId: string) => createFollow(userId),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(['search', 'user', data?.data.user]);
      },
    }
  );

  const deletePostFollow = useMutation((id: string) => deleteFollow(id), {
    onSuccess(data) {
      queryClient.invalidateQueries(['search', 'user', data?.data.user]);
    },
  });

  return { createPostFollow, deletePostFollow };
};
