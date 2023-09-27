import { Button, ButtonProps } from '@chakra-ui/react';

const CircleIconBg = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      align="center"
      cursor="pointer"
      transition="all 0.3s"
      borderRadius="50%"
      p="10px"
      fontSize="20px"
      {...props}
    >
      {children}
    </Button>
  );
};

export default CircleIconBg;
