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
import { Controller, useForm } from 'react-hook-form';
import { MdArrowDropDown } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCreateOrEditItemMutation } from './hooks/useCreateOrEditItemMutation';
import { useListItemTypesOptions } from './hooks/useListItemTypesOptions';
import { Item } from './hooks/useListItems';

interface FormData {
  name: string;
  amount: number;
  itemTypeId: string;
}

export function CreateItemModal({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item?: Item;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: item?.name,
      amount: item?.amount,
      itemTypeId: item?.itemTypeId,
    },
  });
  const { data: itemTypesData } = useListItemTypesOptions();
  const { mutateAsync, isLoading } = useCreateOrEditItemMutation(item?.id);

  const onSubmit = async (data: FormData) => {
    const itemType = itemTypesData?.find((item) => item.id === data.itemTypeId);
    await mutateAsync(
      {
        name: data.name,
        amount: Number(data.amount),
        itemTypeId: data.itemTypeId,
        itemCategoryId: itemType?.itemCategoryId as string,
      },
      {
        onSuccess: () => {
          const message = item
            ? 'Item editado com sucesso!'
            : 'Item criado com sucesso!';
          onClose();
          toast.success(message);
        },
        onError: () => {
          const message = item ? 'Erro ao editar item!' : 'Erro ao criar item!';
          toast.error(message);
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item ? 'Editar' : 'Criar'} item</ModalHeader>
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
                render={({ field }) => (
                  <Select
                    {...field}
                    icon={<MdArrowDropDown />}
                    placeholder="Selecione um tipo"
                  >
                    {itemTypesData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                )}
                rules={{
                  required: true,
                }}
              />
              <FormErrorMessage>Tipo é obrigatório</FormErrorMessage>
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
