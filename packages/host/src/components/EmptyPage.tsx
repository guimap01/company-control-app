import { Box, Text } from '@chakra-ui/react';

export function EmptyPage() {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        Parece que você não tem acesso a essa página ou ela não existe
      </Text>
    </Box>
  );
}
