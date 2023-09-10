import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        maxW: '1024px',
        m: '0 auto',
      },
    },
  },
});

export default theme;
