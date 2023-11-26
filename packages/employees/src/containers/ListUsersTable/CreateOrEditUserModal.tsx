import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import {
  CreateUserData,
  useCreateUserMutation,
} from './hooks/useCreateUserMutation';
import { User } from './hooks/useListUsers';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormData extends CreateUserData {
  passwordConfirmation: string;
}

export function CreateOrEditUserModal({
  user,
  isOpen,
  onClose,
}: {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      role: user?.role || 'USER',
    },
    reValidateMode: 'onChange',
  });
  const { mutateAsync, isLoading } = useCreateUserMutation(user);

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data, {
      onSuccess: () => {
        const message = user
          ? 'Usuário editado com sucesso'
          : 'Usuário criado com sucesso';
        toast.success(message);
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? 'Editar' : 'Criar'} Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            display="flex"
            flexDir="column"
            gap="2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Nome</FormLabel>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <Input {...field} isDisabled={isLoading} />
                )}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} mt={4}>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <Input {...field} isDisabled={isLoading} />
                )}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password} mt={4}>
              <FormLabel>Senha</FormLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: user ? undefined : 'Campo obrigatório' }}
                render={({ field }) => (
                  <Input {...field} isDisabled={isLoading} />
                )}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.passwordConfirmation} mt={4}>
              <FormLabel>Confirmação de senha</FormLabel>
              <Controller
                name="passwordConfirmation"
                control={control}
                rules={{
                  required: user ? undefined : 'Campo obrigatório',
                  validate: (value) =>
                    value === getValues('password') ||
                    'As senhas não são iguais',
                }}
                render={({ field }) => (
                  <Input {...field} isDisabled={isLoading} />
                )}
              />
              <FormErrorMessage>
                {errors.passwordConfirmation &&
                  errors.passwordConfirmation.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.role} mt={4}>
              <FormLabel>Perfil</FormLabel>
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <Select {...field} defaultValue="USER">
                    <option value="ADMIN">Administrador</option>
                    <option value="USER">Usuário</option>
                  </Select>
                )}
              />
              <FormErrorMessage>
                {errors.role && errors.role.message}
              </FormErrorMessage>
            </FormControl>
            <Box w="full" display="flex" justifyContent="end" gap={1} mt={2}>
              <Button mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Salvar
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
