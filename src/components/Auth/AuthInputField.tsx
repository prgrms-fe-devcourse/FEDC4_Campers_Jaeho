import { ComponentProps, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type AuthInputFieldProps = ComponentProps<typeof Input> & {
  error: FieldError;
  label: string;
  id: string;
  isPassword: boolean;
  placeholder: string;
};

const AuthInputField = forwardRef(
  (
    {
      error,
      label,
      id,
      isPassword,
      placeholder,
      children,
      ...props
    }: AuthInputFieldProps,
    ref
  ) => {
    const [isShow, setIsShow] = useBoolean();

    const handlePasswordShow = () => {
      setIsShow.toggle();
    };

    return (
      <FormControl isRequired isInvalid={error && true}>
        <FormLabel my={2} htmlFor={id}>
          {label}
        </FormLabel>
        <InputGroup>
          <Input
            ref={ref}
            id={id}
            type={isPassword ? (isShow ? 'text' : 'password') : 'text'}
            placeholder={placeholder}
            {...props}
          />
          {isPassword && (
            <InputRightElement onClick={handlePasswordShow}>
              {isShow ? <ViewOffIcon /> : <ViewIcon />}
            </InputRightElement>
          )}
        </InputGroup>
        {children}
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default AuthInputField;
