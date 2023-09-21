import { useEffect, useState } from 'react';
import { useQueryUser } from './useQueryUser';
import { Follow, User } from '../types/user';

export const useFilter = (initalState = []) => {
  const [data, setData] = useState<User[] | Follow[]>(initalState);

  const {
    getSearchAllUser: { data: AllUser, isLoading },
    getFollower: { data: Follower },
  } = useQueryUser();

  useEffect(() => {
    if (typeof switchData === 'function') {
      switchData(0);
    }
  }, [isLoading]);

  const switchData = (index: number) => {
    if (!isLoading) {
      switch (index) {
        case 0: {
          const filterData = AllUser.sort((a: User, b: User) => {
            if (a.isOnline === b.isOnline) return 0;

            return a.isOnline ? -1 : 1;
          });
          setData(filterData);
          break;
        }
        case 1: {
          if (Follower && Follower['followers']) {
            setData(Follower['followers']);
          }
          break;
        }
        case 2: {
          if (Follower && Follower['following']) {
            setData(Follower['following']);
          }
          break;
        }
      }
    }
  };

  return [data, switchData];
};
