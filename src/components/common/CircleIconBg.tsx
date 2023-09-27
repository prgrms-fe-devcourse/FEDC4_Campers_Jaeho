import { Stack, StackProps, Button } from '@chakra-ui/react';

const CircleIconBg = ({ children, ...props }: StackProps) => {
  return (
    <Stack
      align="center"
      cursor="pointer"
      transition="all 0.3s"
      borderRadius="50%"
      p="10px"
      {...props}
    >
      <Button variant="ghost">{children}</Button>
    </Stack>
  );
};

export default CircleIconBg;
