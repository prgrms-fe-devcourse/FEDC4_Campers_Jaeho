import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { checkAuth } from '../apis/auth';
import { User } from '../types/user';

type UserInfoProviderProps = {
  children: ReactNode;
};

const UserInfoContext = createContext<User | null>(null);

export const useUserInfoContext = () => useContext(UserInfoContext);

const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await checkAuth();

      if (typeof response === 'object') {
        setUser(response);
      }
    };

    getUserInfo();
  }, []);

  return (
    <UserInfoContext.Provider value={user}>{children}</UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
