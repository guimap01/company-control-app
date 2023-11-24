import { Box, Text } from '@chakra-ui/react';

export function ErrorMF() {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        Houve um erro ao carregar o modulo, por favor tente recarregar a pagina
      </Text>
    </Box>
  );
}
