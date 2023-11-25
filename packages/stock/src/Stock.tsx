import { Box, Heading, VStack } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ListItemsTable } from './containers/ListItemsTable/ListItemsTable';

interface StockProps {
  queryClient: QueryClient;
}

export default function Stock({ queryClient }: StockProps) {
  return (
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
        <ListItemsTable />
      </Box>
    </QueryClientProvider>
  );
}
