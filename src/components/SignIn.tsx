import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, useDisclosure } from '@chakra-ui/react';
import PrimaryButton from './common/PrimaryButton';
import PrimaryAlertDialogSet from './common/PrimaryAlertDialogSet';
import AuthInputFieldWithForm from './Auth/AuthInputFieldWithForm';
import { signin } from '../apis/auth';
import { setLocalStorage } from '../utils/storage';
import passwordValidation from '../utils/passwordValidation';
import { SignInValues as SignInFormValues } from '../types/auth';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues>();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onSubmit = async (data: SignInFormValues) => {
    const response = await signin(data);

    if (typeof response === 'string') {
      onOpen();
      setFocus('email');
      reset();

      return;
    }

    if (typeof response === 'object') {
      const { token } = response;

      setLocalStorage('token', token);
      history.replaceState(null, '', '/');
      navigate('/');
    }
  };

  const registers = {
    email: register('email', {
      required: '이메일은 필수 입력입니다.',
    }),
    password: register('password', {
      required: '비밀번호 입력은 필수입니다.',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상입니다.',
      },
      validate: passwordValidation,
    }),
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <>
      <PrimaryAlertDialogSet
        bodyContent="이메일 혹은 비밀번호가 잘못되었습니다"
        isOpen={isOpen}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInputFieldWithForm
          {...registers.email}
          message={errors.email?.message}
          type="email"
          id="signin-email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
        />
        <AuthInputFieldWithForm
          {...registers.password}
          message={errors.password?.message}
          type="password"
          id="signin-password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          helperTexts={[
            '비밀번호는 8자 이상이면서 특수문자(!, @, #, $, %, ^, &, *, (, )), 영어 대소문자, 숫자는 각각 최소 1개 이상 있어야합니다.',
          ]}
        />
        <ButtonGroup marginTop={10} justifyContent="center" width="100%">
          <PrimaryButton type="submit">로그인</PrimaryButton>
          <PrimaryButton onClick={() => reset()}>초기화</PrimaryButton>
        </ButtonGroup>
      </form>
    </>
  );
};

export default SignIn;
