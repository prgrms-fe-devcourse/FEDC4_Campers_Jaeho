import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchUser, searchUserAll } from '../apis/search';
import { ChangeProfileImage, ChangeUserInfo, UserInfo } from '../apis/user';
import { signup, signin } from '../apis/auth';

export const useQueryUser = (params = '') => {
  const queryClient = useQueryClient();

  const getSearchAllUser = useQuery(['user', 'all'], () => searchUserAll());

  const getSearchUser = useQuery(['search', 'user', params], () =>
    searchUser(params)
  );

  const getFollower = useQuery(
    ['user', 'followInfo'],
    () => searchUser(params),
    { staleTime: 1000 * 60 * 2 }
  );

  const postProfileImage = useMutation(
    (formData) => ChangeProfileImage(formData!),
    {
      onSuccess() {
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  const putUserInfo = useMutation(
    (params: UserInfo) => ChangeUserInfo(params),
    {
      onSuccess() {
        queryClient.invalidateQueries(['search', 'user']);
      },
    }
  );

  const postSignup = useMutation((formData) => signup(formData!));

  const postSignin = useMutation((formData) => signin(formData!));

  // const postLogout = useQuery(['logout'], logout);

  return {
    getSearchAllUser,
    getSearchUser,
    getFollower,
    postProfileImage,
    postSignup,
    postSignin,
    // postLogout,
    putUserInfo,
  };
};
