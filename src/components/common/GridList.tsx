import { Grid, GridProps } from '@chakra-ui/react';

const GridList = ({ children, ...props }: GridProps) => {
  return (
    <Grid
      gap={0}
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default GridList;
