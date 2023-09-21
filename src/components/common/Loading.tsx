import { Spinner, SpinnerProps } from '@chakra-ui/react';

const Loading = ({ ...props }: SpinnerProps) => {
  return (
    <Spinner
      {...props}
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};

export default Loading;
