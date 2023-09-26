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

type UserInfoContextType = {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export const useUserInfoContext = () => useContext(UserInfoContext);

const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await checkAuth();

      if (typeof response === 'object') {
        setUserInfo(response);
      }
    };

    getUserInfo();
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
