import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRecommend } from '../../apis/social';
import { DeleteRecommend } from '../../apis/social';
export const useRecommend = () => {
  const queryClient = useQueryClient();
  const createRecommend = useMutation(
    (postId: string) => CreateRecommend(postId),
    {
      onSuccess() {
        queryClient.invalidateQueries();
      },
    }
  );
  const deleteRecommend = useMutation((postId: string) =>
    DeleteRecommend(postId)
  );

  return { createRecommend, deleteRecommend };
};
