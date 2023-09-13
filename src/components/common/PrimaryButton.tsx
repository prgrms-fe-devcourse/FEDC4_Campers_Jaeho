import { Button, ButtonProps } from '@chakra-ui/react';

const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      my={2}
      px={4}
      backgroundColor={'green.400'}
      color={'white'}
      _hover={{
        backgroundColor: 'green.500',
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
