import { useSearchUser } from './query/useSearchUser';
import { useEffect, useState } from 'react';
import { User } from '../types/user';

export const useFilter = () => {
  const {
    getSearchAllUser: { data: allUser, isLoading, isError },
  } = useSearchUser();
  const [filteredData, setFilteredData] = useState<User[] | null>();

  useEffect(() => {
    if (allUser) {
      setFilteredData(
        allUser.sort((a: User, b: User) => {
          if (a.isOnline && !b.isOnline) return -1;
          if (!a.isOnline && b.isOnline) return 1;

          return 0;
        })
      );
    }
  }, [allUser]);

  return { filteredData, isLoading, isError };
};
