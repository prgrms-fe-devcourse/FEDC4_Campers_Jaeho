import { useSearchUser } from './query/useSearchUser';
import { useEffect, useState } from 'react';
import { Follow, User } from '../types/user';
import { useUserInfoContext } from '../contexts/UserInfoProvider';

export const useFilter = (initalState = []) => {
  const { userInfo } = useUserInfoContext();

  const [filteredData, setFilteredData] = useState<User[] | Follow[]>(
    initalState
  );

  const {
    getSearchAllUser: { data: allUser, isLoading },
    getSearchUser: { data: followerData, isLoading: isLoadingFollow },
  } = useSearchUser(userInfo?._id);

  const switchData = (index: number) => {
    if (!isLoading || !isLoadingFollow) {
      switch (index) {
        case 0: {
          const filteredData = allUser.sort((a: User, b: User) =>
            a.isOnline !== b.isOnline ? 1 : -1
          );
          setFilteredData(filteredData);
          break;
        }
        case 1: {
          if (followerData && followerData['followers']) {
            setFilteredData(followerData['followers']);
          }
          break;
        }
        case 2: {
          if (followerData && followerData['following']) {
            setFilteredData(followerData['following']);
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    // localstorage에 값이 있다면 대입
    switchData(0);
  }, [isLoading]);

  return [filteredData, switchData];
};
