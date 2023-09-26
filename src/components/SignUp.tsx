import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import { ButtonGroup, useDisclosure } from '@chakra-ui/react';
import PrimaryButton from './common/PrimaryButton';
import PrimaryAlertDialogSet from './common/PrimaryAlertDialogSet';
import AuthInputFieldWithForm from './Auth/AuthInputFieldWithForm';
import { signup } from '../apis/auth';
import { setLocalStorage } from '../utils/storage';
import passwordValidation from '../utils/passwordValidation';
import { SignUpValues as SignUpFormValues } from '../types/auth';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>();
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfoContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onSubmit = async (data: SignUpFormValues) => {
    const response = await signup(data);

    if (typeof response === 'string') {
      onOpen();
      setFocus('email');
      reset({
        email: '',
      });

      return;
    }

    if (typeof response === 'object') {
      const { token } = response;

      setLocalStorage('token', token);
      setUserInfo(response.user);
      history.replaceState(null, '', '/');
      navigate('/');
    }
  };

  const registers = {
    email: register('email', {
      required: '이메일 입력은 필수입니다',
    }),
    password: register('password', {
      required: '비밀번호는 8자 이상입니다',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상입니다',
      },
      validate: passwordValidation,
    }),
    passwordConfirm: register('passwordConfirm', {
      required: '재확인 비밀번호를 입력해주세요',
      validate: (
        _: string,
        { password, passwordConfirm }: SignUpFormValues
      ) => {
        return password === passwordConfirm || '비밀번호가 일치하지 않습니다';
      },
    }),
    fullName: register('fullName', {
      required: '',
      minLength: {
        value: 2,
        message: '닉네임은 2글자 이상입니다',
      },
    }),
  };

  return (
    <>
      <PrimaryAlertDialogSet
        bodyContent="이미 존재하는 이메일입니다"
        isOpen={isOpen}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInputFieldWithForm
          {...registers.email}
          message={errors.email?.message}
          type="email"
          id="signup-email"
          label="이메일"
          placeholder="이메일을 형식에 맞게 입력해주세요"
        />
        <AuthInputFieldWithForm
          {...registers.password}
          message={errors.password?.message}
          type="password"
          id="signup-password"
          label="비밀번호"
          placeholder="비밀번호를 형식에 맞게 입력해주세요"
          helperTexts={[
            '비밀번호는 8자 이상이면서 특수문자(!, @, #, $, %, ^, &, *, (, )), 영어 대소문자, 숫자는 각각 최소 1개 이상 있어야합니다.',
          ]}
        />
        <AuthInputFieldWithForm
          {...registers.passwordConfirm}
          message={errors.passwordConfirm?.message}
          type="password"
          id="signup-password-confirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <AuthInputFieldWithForm
          {...registers.fullName}
          message={errors.fullName?.message}
          type="text"
          id="signup-nickname"
          label="닉네임"
          placeholder="닉네임을 2자 이상 입력해주세요"
        />
        <ButtonGroup marginTop={10} justifyContent="center" width="100%">
          <PrimaryButton type="submit">회원가입</PrimaryButton>
          <PrimaryButton onClick={() => reset()}>초기화</PrimaryButton>
        </ButtonGroup>
      </form>
    </>
  );
};

export default SignUp;
