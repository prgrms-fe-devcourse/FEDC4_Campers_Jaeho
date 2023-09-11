import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AuthButton from './common/Auth/AuthButton';
import passwordValidation from '../utils/passwordValidation';

export interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfilm: string;
  nickname: string;
}

const SignUp = () => {
  const [isShow, setIsShow] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfilm: '',
      nickname: '',
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
  };

  const handlePasswordShow = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.email && true}>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <InputGroup>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 형식에 맞게 입력해주세요"
            {...register('email', {
              required: '이메일 입력은 필수입니다',
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.password && true}>
        <FormLabel my={2} htmlFor="password">
          비밀번호
        </FormLabel>
        <InputGroup>
          <Input
            id="password"
            type={isShow ? 'text' : 'password'}
            placeholder="비밀번호를 형식에 맞게 입력해주세요"
            {...register('password', {
              required: '비밀번호는 8자 이상입니다',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상입니다',
              },
              validate: passwordValidation,
            })}
          />
          <InputRightElement onClick={handlePasswordShow}>
            {isShow ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
        <Text fontSize={'xs'} color={'blackAlpha.600'}>
          특수문자(!, @, #, $, %, ^, &, *, (, )), 영어 대소문자, 숫자는 각각
          최소 1개 이상 있어야합니다
        </Text>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.passwordConfilm && true}>
        <FormLabel my={2} htmlFor="password-confilm">
          비밀번호 재입력
        </FormLabel>
        <InputGroup>
          <Input
            id="password-confilm"
            type={isShow ? 'text' : 'password'}
            placeholder="재확인 비밀번호를 입력해주세요"
            {...register('passwordConfilm', {
              required: '재확인 비밀번호를 입력해주세요',
              validate: (
                _: string,
                { password, passwordConfilm }: SignUpFormValues
              ) =>
                password === passwordConfilm || '비밀번호가 일치하지 않습니다',
            })}
          />
          <InputRightElement onClick={handlePasswordShow}>
            {isShow ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.passwordConfilm && errors.passwordConfilm.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.nickname && true}>
        <FormLabel my={2} htmlFor="nickname">
          닉네임
        </FormLabel>
        <Input
          id="nickname"
          type="text"
          placeholder="닉네임은 2글자 이상입니다"
          {...register('nickname', {
            required: '',
            minLength: {
              value: 2,
              message: '닉네임은 2글자 이상입니다',
            },
          })}
        />
        <FormErrorMessage>
          {errors.nickname && errors.nickname.message}
        </FormErrorMessage>
      </FormControl>
      <ButtonGroup my={2} justifyContent={'center'} width="100%">
        <AuthButton type="submit">회원가입</AuthButton>
        <AuthButton
          onClick={() =>
            reset({
              email: '',
              password: '',
              passwordConfilm: '',
              nickname: '',
            })
          }
        >
          초기화
        </AuthButton>
      </ButtonGroup>
    </form>
  );
};

export default SignUp;
