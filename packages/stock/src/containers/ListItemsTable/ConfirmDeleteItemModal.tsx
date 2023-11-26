import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDeleteItemMutation } from './hooks/useDeleteItemMutation';
import { Item } from './hooks/useListItems';

export function ConfirmDeleteItemModal({
  item,
  isOpen,
  onClose,
}: {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutateAsync, isLoading } = useDeleteItemMutation(item.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Tem certeza que deseja excluir o item {item.name}?
        </ModalBody>
        <ModalFooter>
          <Box w="full" display="flex" justifyContent="end" gap={1} mt={2}>
            <Button
              colorScheme="red"
              onClick={async () => {
                await mutateAsync();
                onClose();
              }}
              isLoading={isLoading}
            >
              Excluir
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
