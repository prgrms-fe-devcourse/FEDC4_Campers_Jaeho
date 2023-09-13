import { useForm } from 'react-hook-form';
import { ButtonGroup, Text } from '@chakra-ui/react';
import PrimaryButton from './common/PrimaryButton';
import AuthInputField from './Auth/AuthInputField';
import passwordValidation from '../utils/passwordValidation';

type SignUpFormValues = {
  signUpEmail: string;
  signUpPassword: string;
  signUpPasswordConfirm: string;
  signUpNickname: string;
};

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>();

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);

    reset();
  };

  const registers = {
    signUpEmail: register('signUpEmail', {
      required: '이메일 입력을 필수입니다',
    }),
    signUpPassword: register('signUpPassword', {
      required: '비밀번호는 8자 이상입니다',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상입니다',
      },
      validate: passwordValidation,
    }),
    signUpPasswordConfirm: register('signUpPasswordConfirm', {
      required: '재확인 비밀번호를 입력해주세요',
      validate: (
        _: string,
        { signUpPassword, signUpPasswordConfirm }: SignUpFormValues
      ) =>
        signUpPassword === signUpPasswordConfirm ||
        '비밀번호가 일치하지 않습니다',
    }),
    signUpNickname: register('signUpNickname', {
      required: '',
      minLength: {
        value: 2,
        message: '닉네임은 2글자 이상입니다',
      },
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthInputField
        {...registers.signUpEmail}
        error={errors.signUpEmail}
        id={'signup-email'}
        label={'이메일'}
        placeholder={'이메일을 형식에 맞게 입력해주세요'}
      />
      <AuthInputField
        {...registers.signUpPassword}
        error={errors.signUpPassword}
        id={'signup-password'}
        label={'비밀번호'}
        placeholder={'비밀번호를 형식에 맞게 입력해주세요'}
        isPassword
      >
        <Text fontSize={'xs'} color={'blackAlpha.600'}>
          비밀번호는 8자 이상이면서 특수문자(!, @, #, $, %, ^, &, *, (, )), 영어
          대소문자, 숫자는 각각 최소 1개 이상 있어야합니다.
        </Text>
      </AuthInputField>
      <AuthInputField
        {...registers.signUpPasswordConfirm}
        error={errors.signUpPasswordConfirm}
        id={'signup-password-confirm'}
        label={'비밀번호 확인'}
        placeholder={'비밀번호를 다시 입력해주세요'}
        isPassword
      />
      <AuthInputField
        {...registers.signUpNickname}
        error={errors.signUpNickname}
        id={'signup-nickname'}
        label={'닉네임'}
        placeholder={'닉네임을 2자 이상 입력해주세요'}
      />
      <ButtonGroup my={2} justifyContent={'center'} width="100%">
        <PrimaryButton type="submit">회원가입</PrimaryButton>
        <PrimaryButton onClick={() => reset()}>초기화</PrimaryButton>
      </ButtonGroup>
    </form>
  );
};

export default SignUp;
