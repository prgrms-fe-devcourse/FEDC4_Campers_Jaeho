import { Grid, GridProps } from '@chakra-ui/react';

const GridList = ({ children, gap = 0, ...props }: GridProps) => {
  return (
    <Grid
      {...props}
      gap={gap}
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      {children}
    </Grid>
  );
};

export default GridList;
