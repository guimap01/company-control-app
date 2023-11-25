import {
  useColorModeValue,
  Box,
  Heading,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    reValidateMode: 'onChange',
  });

  async function onSubmit(data: FormData) {
    await login(data);
  }
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        as="form"
        bg="white"
        p="6"
        w="80"
        onSubmit={handleSubmit(onSubmit)}
        borderRadius="md"
      >
        <VStack gap={4}>
          <Heading>Bem vindo</Heading>

          <VStack gap={2} w="full">
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Usuário</FormLabel>
              <Controller
                name="username"
                control={control}
                render={({ field }) => <Input {...field} />}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Usuário é obrigatório</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} type="password" />}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Senha é obrigatório</FormErrorMessage>
            </FormControl>
          </VStack>
          <Button colorScheme="blue" w="full" type="submit">
            Acessar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
