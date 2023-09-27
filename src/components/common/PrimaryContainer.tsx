import { Container } from '@chakra-ui/react';
import { ComponentProps } from 'react';

const PrimaryContainer = ({
  children,
  ...props
}: ComponentProps<typeof Container>) => {
  return (
    <Container
      minH="100vh"
      maxW="container.sm"
      justifyContent="center"
      pos="relative"
      p={0}
      boxShadow="md"
      {...props}
    >
      {children}
    </Container>
  );
};

export default PrimaryContainer;
