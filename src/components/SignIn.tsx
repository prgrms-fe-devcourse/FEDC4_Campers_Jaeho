import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ButtonGroup, Text } from '@chakra-ui/react';
import PrimaryButton from './common/PrimaryButton';
import AuthInputField from './Auth/AuthInputField';
import passwordValidation from '../utils/passwordValidation';

type SignInFormValues = {
  signInEmail: string;
  signInPassword: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues>();

  const onSubmit = (data: SignInFormValues) => {
    console.log(data);

    reset();
  };

  const registers = {
    signInEmail: register('signInEmail', {
      required: '이메일은 필수 입력입니다.',
    }),
    signInPassword: register('signInPassword', {
      required: '비밀번호 입력은 필수입니다.',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상입니다.',
      },
      validate: passwordValidation,
    }),
  };

  useEffect(() => {
    setFocus('signInEmail');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthInputField
        {...registers.signInEmail}
        error={errors.signInEmail}
        id={'signin-email'}
        label={'이메일'}
        placeholder={'이메일을 입력해주세요'}
      />
      <AuthInputField
        {...registers.signInPassword}
        error={errors.signInPassword}
        id={'signin-password'}
        label={'비밀번호'}
        placeholder={'비밀번호를 입력해주세요'}
        isPassword
      >
        <Text fontSize={'xs'} color={'blackAlpha.600'}>
          비밀번호는 8자 이상이면서 특수문자(!, @, #, $, %, ^, &, *, (, )), 영어
          대소문자, 숫자는 각각 최소 1개 이상 있어야합니다.
        </Text>
      </AuthInputField>
      <ButtonGroup my={2} justifyContent={'center'} width="100%">
        <PrimaryButton type="submit">로그인</PrimaryButton>
        <PrimaryButton onClick={() => reset()}>초기화</PrimaryButton>
      </ButtonGroup>
    </form>
  );
};

export default SignIn;
