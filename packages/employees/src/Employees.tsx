import { Box } from '@chakra-ui/react';
import { HostProvider, User } from './context/HostProvider';
import { AxiosInstance } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ListUsersTable } from './containers/ListUsersTable/ListUsersTable';

interface StockProps {
  queryClient: QueryClient;
  api: AxiosInstance;
  user: User;
}

export default function Employees({ queryClient, api, user }: StockProps) {
  return (
    <HostProvider api={api} user={user}>
      <QueryClientProvider client={queryClient}>
        <Box
          h={'calc(100vh - 7rem)'}
          maxH={'calc(100vh - 7rem)'}
          overflowY="auto"
          w="full"
          display="flex"
          flexDir="column"
          justifyContent="start"
          p="4"
        >
          <ListUsersTable />
        </Box>
      </QueryClientProvider>
    </HostProvider>
  );
}
