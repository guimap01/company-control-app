import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react';
import { User } from './hooks/useListUsers';
import { useDeleteUserMutation } from './hooks/userDeleteUserMutation';

export function ConfirmDeleteUserModal({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutateAsync, isLoading } = useDeleteUserMutation(user.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Tem certeza que deseja excluir o usuário {user.name}?
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
