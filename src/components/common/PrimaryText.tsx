import { Text, TextProps, Box, BoxProps } from '@chakra-ui/react';

type PrimaryTextProps = TextProps & BoxProps;

const PrimaryText = ({ width, children, ...props }: PrimaryTextProps) => {
  return (
    <Box width={width}>
      <Text {...props} isTruncated>
        {children}
      </Text>
    </Box>
  );
};

export default PrimaryText;
