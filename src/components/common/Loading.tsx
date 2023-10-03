import { Spinner } from '@chakra-ui/react';
import { ComponentProps } from 'react';

const Loading = ({ ...props }: ComponentProps<typeof Spinner>) => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      {...props}
    />
  );
};

export default Loading;
