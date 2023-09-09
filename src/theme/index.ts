import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        mw: '1024px',
        m: '0 auto',
      },
    },
  },
  // colors: {
  //   black: '#0D1321',
  //   green: '#28B67E',
  //   darkGray: '#919392',
  //   gray: '#D3DCDE',
  // },
});

export default theme;
