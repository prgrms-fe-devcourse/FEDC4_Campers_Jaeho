import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPoster } from '../../apis/poster';
import { useNavigate } from 'react-router-dom';
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createPost = useMutation(
    (formData: FormData) => createPoster(formData!),
    {
      onSuccess() {
        queryClient.invalidateQueries();
        navigate('/');
      },
    }
  );

  return { createPost };
};
