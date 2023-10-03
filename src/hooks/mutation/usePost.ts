import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../apis/poster';

export const usePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const DeletePost = useMutation((id: string) => deletePost(id), {
    onSuccess() {
      queryClient.invalidateQueries();
      navigate('/');
    },
  });

  return { DeletePost };
};
