import { Flex, FlexProps } from '@chakra-ui/react';

const PrimaryHeader = ({ children, ...props }: FlexProps) => {
  return (
    <Flex align="center" {...props}>
      {children}
    </Flex>
  );
};

export default PrimaryHeader;
