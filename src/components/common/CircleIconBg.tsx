import { Stack, StackProps } from '@chakra-ui/react';

const CircleIconBg = ({ children, ...props }: StackProps) => {
  return (
    <Stack
      align="center"
      cursor="pointer"
      transition="all 0.3s"
      borderRadius="50%"
      p="10px"
      _hover={{
        bgColor: 'gray.100',
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};

export default CircleIconBg;
