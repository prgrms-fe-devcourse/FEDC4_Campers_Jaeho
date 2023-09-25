import { createFollow, deleteFollow } from './../../apis/social';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useFollow = () => {
  const queryClient = useQueryClient();

  const createPostFollow = useMutation(
    (userId: string) => createFollow(userId),
    {
      onSuccess() {
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  const deletePostFollow = useMutation(deleteFollow);

  return { createPostFollow, deletePostFollow };
};
