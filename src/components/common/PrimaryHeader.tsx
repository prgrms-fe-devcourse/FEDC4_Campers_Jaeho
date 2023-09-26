import { Flex, FlexProps } from '@chakra-ui/react';

const PrimaryHeader = ({ children, ...props }: FlexProps) => {
  return (
    <Flex align="center" minH="60px" p="10px" {...props}>
      {children}
    </Flex>
  );
};

export default PrimaryHeader;
