import { Stack, StackProps } from '@chakra-ui/react';

const AbsoluteCenterBox = ({ children, ...props }: StackProps) => {
  return (
    <Stack
      align="center"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -60%)"
      w="100%"
      {...props}
    >
      {children}
    </Stack>
  );
};

export default AbsoluteCenterBox;
