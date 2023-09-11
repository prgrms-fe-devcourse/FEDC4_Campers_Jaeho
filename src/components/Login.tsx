import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import passwordValidation from '../utils/passwordValidation';
import AuthButton from './common/Auth/AuthButton';
import {
  Input,
  Center,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit: onSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    console.log(data);

    reset();
  };

  const handlePasswordShow = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <FormControl isRequired isInvalid={errors.email && true}>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <InputGroup>
          <Input
            id="email"
            type="email"
            placeholder="아이디를 입력하세요"
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
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
            placeholder="비밀번호를 입력하세요"
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상입니다.',
              },
              validate: passwordValidation,
            })}
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
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Center>
        <AuthButton type="submit">로그인</AuthButton>
      </Center>
    </form>
  );
};

export default Login;
