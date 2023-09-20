import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchUser, searchUserAll } from '../apis/search';
import { ChangeProfileImage, ChangeUserInfo, UserInfo } from '../apis/user';
import { signup, signin, logout } from '../apis/auth';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';

export const useQueryUser = (params = '') => {
  const queryClient = useQueryClient();
  const navigator = useNavigate();

  const getSearchAllUser = useQuery(['user', 'all'], () => searchUserAll());

  const getSearchUser = useQuery(['search', 'user', params], () =>
    searchUser(params)
  );

  const getFollower = useQuery(
    ['user', 'followInfo'],
    () => searchUser('6507fddf2d1e001bf75a78d0'),
    { staleTime: 1000 * 60 * 2 }
  );

  const postProfileImage = useMutation(
    (formData) => ChangeProfileImage(formData!),
    {
      onSuccess() {
        navigator(`${ROUTES.USER_EDIT}`);
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  const putUserInfo = useMutation(
    (params: UserInfo) => ChangeUserInfo(params),
    {
      onSuccess() {
        navigator(`${ROUTES.USER_EDIT}`);
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  const postSignup = useMutation((formData) => signup(formData!), {
    onSuccess() {
      navigator(`${ROUTES.MAIN}`);
    },
  });

  const postSignin = useMutation((formData) => signin(formData!), {
    onSuccess() {
      navigator(`${ROUTES.MAIN}`);
    },
  });

  const postLogout = useQuery(['logout'], logout);

  return {
    getSearchAllUser,
    getSearchUser,
    getFollower,
    postProfileImage,
    postSignup,
    postSignin,
    postLogout,
    putUserInfo,
  };
};
