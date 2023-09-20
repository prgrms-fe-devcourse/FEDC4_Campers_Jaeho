import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSearchResult } from '../apis/search';
import { CreatePoster } from '../apis/poster';
import { useNavigate } from 'react-router-dom';

export const useQueryPost = (keyword = '') => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getAllBoth = useQuery(
    ['search', 'both', keyword],
    () => getSearchResult(keyword),
    {
      enabled: !!keyword,
    }
  );

  const createPoster = useMutation((formData) => CreatePoster(formData!), {
    onSuccess() {
      navigate('/');
      queryClient.invalidateQueries();
    },
  });

  return { getAllBoth, createPoster };
};
