import { Grid, GridProps } from '@chakra-ui/react';

const GridList = ({ children, gap = 0 }: GridProps) => {
  return (
    <Grid
      gap={gap}
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      {children}
    </Grid>
  );
};

export default GridList;
