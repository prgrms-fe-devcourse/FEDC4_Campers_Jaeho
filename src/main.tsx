import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import theme from './theme/index.ts';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserInfoProvider from './contexts/UserInfoProvider.tsx';
import theme from './theme';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserInfoProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ChakraProvider>
    </UserInfoProvider>
  </React.StrictMode>
);
