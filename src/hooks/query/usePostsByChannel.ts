import { useQuery } from '@tanstack/react-query';
import { searchPosterAll } from '../../apis/search';

// 메인페이지 데이터 가져오기
export const usePostsByChannel = (channelId = '', offset = 0, limit = 0) => {
  const getMorePost = useQuery(
    ['channel-posts', channelId, offset, limit],
    () => searchPosterAll(channelId, offset, limit)
  );

  return { getMorePost };
};
