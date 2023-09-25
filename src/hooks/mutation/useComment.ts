import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment } from '../../apis/comment';

export const useComment = () => {
  const querClient = useQueryClient();
  const CreateCommnet = useMutation(
    ({ comment, postId }: { comment: string; postId: string }) =>
      createComment({ comment, postId }),
    {
      onSuccess(data) {
        console.log('check data', data);
        querClient.invalidateQueries(['detail', data?.data.post]);
      },
    }
  );

  const DeleteComment = useMutation((id: string) => deleteComment(id), {
    onSuccess(data) {
      querClient.invalidateQueries(['detail', data?.data.post]);
    },
  });

  return { CreateCommnet, DeleteComment };
};
