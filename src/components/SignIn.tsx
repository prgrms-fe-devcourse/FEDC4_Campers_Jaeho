import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  Input,
  ButtonGroup,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  useBoolean,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import AuthButton from './Auth/AuthButton';
import passwordValidation from '../utils/passwordValidation';

type SignInFormValues = {
  signInEmail: string;
  signInPassword: string;
};

const SignIn = () => {
  const [isShow, setIsShow] = useBoolean();
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

  const handlePasswordShow = () => {
    setIsShow.toggle();
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
      <FormControl isRequired isInvalid={errors.signInEmail && true}>
        <FormLabel htmlFor="signin-email">이메일</FormLabel>
        <InputGroup>
          <Input
            id="signin-email"
            type="email"
            placeholder="이메일을 입력하세요"
            {...registers.signInEmail}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.signInEmail && errors.signInEmail.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.signInPassword && true}>
        <FormLabel my={2} htmlFor="signin-password">
          비밀번호
        </FormLabel>
        <InputGroup>
          <Input
            id="signin-password"
            type={isShow ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            {...registers.signInPassword}
          />
          <InputRightElement onClick={handlePasswordShow}>
            {isShow ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
        <Text fontSize={'xs'} color={'blackAlpha.600'}>
          비밀번호는 8자 이상이면서 특수문자(!, @, #, $, %, ^, &, *, (, )), 영어
          대소문자, 숫자는 각각 최소 1개 이상 있어야합니다.
        </Text>
        <FormErrorMessage>
          {errors.signInPassword && errors.signInPassword.message}
        </FormErrorMessage>
      </FormControl>
      <ButtonGroup my={2} justifyContent={'center'} width="100%">
        <AuthButton type="submit">로그인</AuthButton>
        <AuthButton onClick={() => reset()}>초기화</AuthButton>
      </ButtonGroup>
    </form>
  );
};

export default SignIn;
