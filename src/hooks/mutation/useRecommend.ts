import { useMutation } from '@tanstack/react-query';
import { CreateRecommend } from '../../apis/social';
import { DeleteRecommend } from '../../apis/social';
export const useRecommend = () => {
  const createRecommend = useMutation((postId: string) =>
    CreateRecommend(postId)
  );
  const deleteRecommend = useMutation(
    (postId: string) => DeleteRecommend(postId),
    {
      onSuccess() {
        console.log('성공');
      },
    }
  );

  return { createRecommend, deleteRecommend };
};
