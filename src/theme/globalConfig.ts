import { extendTheme } from '@chakra-ui/react';

const globalConfig = {
  colors: {
    black: '#0D1321',
    green: '#28B67E',
    darkGray: '#919392',
    gray: '#D3DCDE',
  },
};

const theme = extendTheme({ globalConfig });

export default theme;
