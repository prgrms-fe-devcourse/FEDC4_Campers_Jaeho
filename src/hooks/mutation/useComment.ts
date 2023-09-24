import { useMutation } from '@tanstack/react-query';
import { createComment, deleteComment } from '../../apis/comment';

export const useComment = () => {
  const CreateCommnet = useMutation(
    ({ comment, postId }: { comment: string; postId: string }) =>
      createComment({ comment, postId })
  );

  const DeleteComment = useMutation((id: string) => deleteComment(id));

  return { CreateCommnet, DeleteComment };
};
