import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Item } from './hooks/useListItems';
import { useCreateWithdrawalMutation } from './hooks/useCreateWithdrawalMutation';

interface FormData {
  amount: number;
}

export function WithdrawalModal({
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
  const { mutateAsync, isLoading } = useCreateWithdrawalMutation();

  const onSubmit = async (data: FormData) => {
    await mutateAsync(
      {
        itemId: item.id,
        amount: Number(data.amount),
      },
      {
        onSuccess: () => {
          toast.success('Retirada realizado com sucesso!');
          onClose();
        },
        onError: () => {
          toast.error('Erro ao realizar retirada!');
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Retirar item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel>Quantidade</FormLabel>
              <Controller
                name="amount"
                control={control}
                defaultValue={1}
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Quantidade"
                    min={1}
                  />
                )}
              />
              <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>
            <Box w="full" display="flex" justifyContent="end" gap={1} mt={2}>
              <Button mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Salvar
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
