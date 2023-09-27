import { Stack, StackProps } from '@chakra-ui/react';

const CircleIconBg = ({ children, ...props }: StackProps) => {
  return (
    <Stack
      align="center"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ bgColor: 'gray.100' }}
      borderRadius="50%"
      p="10px"
      {...props}
    >
      {children}
    </Stack>
  );
};

export default CircleIconBg;
