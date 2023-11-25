import { ChakraProvider } from '@chakra-ui/react';
import { AppRoutes } from './routes';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppRoutes queryClient={queryClient} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
