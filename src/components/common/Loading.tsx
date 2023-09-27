import { Box, Spinner, BoxProps } from '@chakra-ui/react';

const Loading = ({ ...props }: BoxProps) => {
  return (
    <Box {...props}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
