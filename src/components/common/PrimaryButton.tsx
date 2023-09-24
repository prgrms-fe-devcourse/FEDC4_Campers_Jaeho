import { Button, ButtonProps } from '@chakra-ui/react';

const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      my={2}
      px={[4, 8]}
      bgColor="green.400"
      color="white"
      _hover={{
        bgColor: 'green.500',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
