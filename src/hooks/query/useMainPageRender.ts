import { useInfiniteQuery } from '@tanstack/react-query';
import { searchPosterAll } from '../../apis/search';

const useMainPageRender = (id: string) => {
  const fetchPage = ({ pageParam = 0 }) => searchPosterAll(id, pageParam);

  return useInfiniteQuery([], fetchPage, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length === 6 && allPages.length * 6,
  });
};

export default useMainPageRender;
