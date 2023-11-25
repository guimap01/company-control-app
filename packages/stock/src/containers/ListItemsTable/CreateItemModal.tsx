import { Controller, useForm } from 'react-hook-form';
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
} from '@chakra-ui/react';

interface FormData {
  name: string;
  amount: number;
  itemTypeId: string;
  itemCategoryId: string;
}

export function CreateItemModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar item</ModalHeader>
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
                render={({ field }) => <Input {...field} />}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Nome é obrigatório</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel>Quantidade</FormLabel>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => <Input {...field} />}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Quantidade é obrigatório</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.itemTypeId}>
              <FormLabel>Tipo</FormLabel>
              <Controller
                name="itemTypeId"
                control={control}
                render={({ field }) => <Input {...field} />}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Tipo é obrigatório</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.itemCategoryId}>
              <FormLabel>Categoria</FormLabel>
              <Controller
                name="itemCategoryId"
                control={control}
                render={({ field }) => <Input {...field} />}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Categoria é obrigatório</FormErrorMessage>
            </FormControl>
            <Box w="full" display="flex" justifyContent="end" gap={1} mt={2}>
              <Button mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" type="submit">
                Salvar
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
