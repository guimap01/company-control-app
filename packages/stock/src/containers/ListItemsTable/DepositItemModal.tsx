import { Controller, useForm } from 'react-hook-form';
import { Item } from './hooks/useListItems';
import { useDepositMutation } from './hooks/useDepositMutation';
import { toast } from 'react-toastify';
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
  amount: number;
}

export function DepositItemModal({
  item,
  isOpen,
  onClose,
}: {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const { mutateAsync, isLoading } = useDepositMutation();

  const onSubmit = async (data: FormData) => {
    await mutateAsync(
      {
        itemId: item.id,
        amount: Number(data.amount),
      },
      {
        onSuccess: () => {
          toast.success('Deposito realizado com sucesso!');
          onClose();
        },
        onError: () => {
          toast.error('Erro ao realizar deposito!');
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Depositar item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="amount" isInvalid={!!errors.amount}>
              <FormLabel>Quantidade</FormLabel>
              <Controller
                name="amount"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Quantidade"
                    min={1}
                  />
                )}
              />
              <FormErrorMessage>Quantidade é obrigatório</FormErrorMessage>
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
