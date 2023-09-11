import { PropsWithChildren } from 'react';
import { Button } from '@chakra-ui/react';

type AuthButtonType = 'button' | 'submit';

interface SignUpButtonProps {
  type: AuthButtonType;
  onClick: () => void;
}

const AuthButton = ({
  children,
  type = 'button',
  onClick,
}: PropsWithChildren<Partial<SignUpButtonProps>>) => {
  return (
    <Button
      type={type}
      my={2}
      px={4}
      backgroundColor={'green.400'}
      color={'white'}
      onClick={onClick}
      _hover={{
        backgroundColor: 'green.500',
      }}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
