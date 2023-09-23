import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

const PrimaryGrid = ({ children, ...props }: SimpleGridProps) => {
  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2} w="100%" {...props}>
      {children}
    </SimpleGrid>
  );
};

export default PrimaryGrid;
