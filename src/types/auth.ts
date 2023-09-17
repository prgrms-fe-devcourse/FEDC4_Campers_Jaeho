import { UserResponseData } from './user';

export type SignResponseData = UserResponseData & {
  token: string;
};

export type SignInValues = {
  email: string;
  password: string;
};

export type SignUpValues = SignInValues & {
  fullName: string;
  passwordConfirm: string;
};
