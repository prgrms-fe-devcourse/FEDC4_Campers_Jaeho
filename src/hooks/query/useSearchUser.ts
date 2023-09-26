import { searchUserAll, searchUser } from '../../apis/search';
import { useQuery } from '@tanstack/react-query';

export const useSearchUser = (params = '') => {
  const getSearchAllUser = useQuery(['user', 'all'], () => searchUserAll());

  // 팔로우 데이터도 받을수 있다.
  // 2분동안 유지
  // params 입력시 실행
  const getSearchUser = useQuery(
    ['search', 'user', params],
    () => searchUser(params),
    { enabled: !!params }
  );

  return { getSearchAllUser, getSearchUser };
};
