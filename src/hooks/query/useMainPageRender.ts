import { useInfiniteQuery } from '@tanstack/react-query';
import { searchPosterAll } from '../../apis/search';

const useMainPageRender = (id: string) => {
  const fetchPage = ({ pageParam = 0 }) => searchPosterAll(id, pageParam);

  return useInfiniteQuery([], fetchPage, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length === 12 && allPages.length * 12,
  });
};

export default useMainPageRender;
