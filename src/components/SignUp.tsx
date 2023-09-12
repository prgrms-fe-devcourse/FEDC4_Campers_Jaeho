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
  useBoolean,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import PrimaryButton from './common/PrimaryButton';
import passwordValidation from '../utils/passwordValidation';

type SignUpFormValues = {
  signUpEmail: string;
  signUpPassword: string;
  signUpPasswordConfilm: string;
  signUpNickname: string;
};

const SignUp = () => {
  const [isShow, setIsShow] = useBoolean();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>();

  const handlePasswordShow = () => {
    setIsShow.toggle();
  };

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
    signUpPasswordConfilm: register('signUpPasswordConfilm', {
      required: '재확인 비밀번호를 입력해주세요',
      validate: (
        _: string,
        { signUpPassword, signUpPasswordConfilm }: SignUpFormValues
      ) =>
        signUpPassword === signUpPasswordConfilm ||
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
      <FormControl isRequired isInvalid={errors.signUpEmail && true}>
        <FormLabel htmlFor="signup-email">이메일</FormLabel>
        <InputGroup>
          <Input
            id="signup-email"
            type="email"
            placeholder="이메일을 형식에 맞게 입력해주세요"
            {...registers.signUpEmail}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.signUpEmail && errors.signUpEmail.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.signUpPassword && true}>
        <FormLabel my={2} htmlFor="signup-password">
          비밀번호
        </FormLabel>
        <InputGroup>
          <Input
            id="signup-password"
            type={isShow ? 'text' : 'password'}
            placeholder="비밀번호를 형식에 맞게 입력해주세요"
            {...registers.signUpPassword}
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
          {errors.signUpPassword && errors.signUpPassword.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.signUpPasswordConfilm && true}>
        <FormLabel my={2} htmlFor="signup-password-confilm">
          비밀번호 재입력
        </FormLabel>
        <InputGroup>
          <Input
            id="singup-password-confilm"
            type={isShow ? 'text' : 'password'}
            placeholder="재확인 비밀번호를 입력해주세요"
            {...registers.signUpPasswordConfilm}
          />
          <InputRightElement onClick={handlePasswordShow}>
            {isShow ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.signUpPasswordConfilm && errors.signUpPasswordConfilm.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.signUpNickname && true}>
        <FormLabel my={2} htmlFor="signup-nickname">
          닉네임
        </FormLabel>
        <Input
          id="signup-nickname"
          type="text"
          placeholder="닉네임은 2글자 이상입니다"
          {...registers.signUpNickname}
        />
        <FormErrorMessage>
          {errors.signUpNickname && errors.signUpNickname.message}
        </FormErrorMessage>
      </FormControl>
      <ButtonGroup my={2} justifyContent={'center'} width="100%">
        <PrimaryButton type="submit">회원가입</PrimaryButton>
        <PrimaryButton onClick={() => reset()}>초기화</PrimaryButton>
      </ButtonGroup>
    </form>
  );
};

export default SignUp;
