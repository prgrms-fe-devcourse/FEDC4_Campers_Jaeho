import { Text, TextProps, Box } from '@chakra-ui/react';

const PrimaryText = ({ width, children, ...props }: TextProps) => {
  return (
    <Box w={width}>
      <Text {...props} isTruncated>
        {children}
      </Text>
    </Box>
  );
};

export default PrimaryText;
