import { useMutation } from '@tanstack/react-query';
import { CreateRecommend } from '../../../apis/social';

export const useRecommend = () => {
  const postRecommend = useMutation((postId: string) =>
    CreateRecommend(postId)
  );

  return postRecommend;
};
