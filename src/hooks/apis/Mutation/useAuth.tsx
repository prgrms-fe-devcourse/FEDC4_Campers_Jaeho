import { signup, signin } from '../../../apis/auth';
import { useMutation } from '@tanstack/react-query';

export const useAuth = () => {
  const postSignUp = useMutation((formData) => signup(formData!));

  const postSignIn = useMutation((formData) => signin(formData!));

  return { postSignIn, postSignUp };
};
