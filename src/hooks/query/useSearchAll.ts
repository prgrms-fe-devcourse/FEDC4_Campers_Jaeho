import { useQuery } from '@tanstack/react-query';
import { getSearchResult } from '../../apis/search';

export const useSearchAll = (keyword = '') => {
  const getAllBoth = useQuery(
    ['search', 'both', keyword],
    () => getSearchResult(keyword),
    {
      enabled: !!keyword,
    }
  );

  return { getAllBoth };
};
