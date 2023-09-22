import { ComponentProps, forwardRef } from 'react';
import {
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

type AuthInputFieldWithFormProps = ComponentProps<typeof Input> & {
  message: string;
  label: string;
  helperTexts?: string[];
};

const AuthInputFieldWithForm = forwardRef<
  HTMLInputElement,
  AuthInputFieldWithFormProps
>(({ message, label, helperTexts, type, id, ...inputProps }, ref) => {
  const [isShow, setIsShow] = useBoolean();

  return (
    <FormControl isRequired isInvalid={message ? true : false}>
      <FormLabel my={2} htmlFor={id}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          {...inputProps}
          id={id}
          ref={ref}
          type={type === 'password' ? (isShow ? 'text' : 'password') : type}
          bgColor="gray.200"
        />
        {type === 'password' && (
          <InputRightElement onClick={() => setIsShow.toggle()}>
            {isShow ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        )}
      </InputGroup>
      {helperTexts &&
        helperTexts.map((helperText, index) => (
          <Text key={index} fontSize="xs" color="blackAlpha.600">
            {helperText}
          </Text>
        ))}
      <FormErrorMessage>{message}</FormErrorMessage>
    </FormControl>
  );
});

export default AuthInputFieldWithForm;
