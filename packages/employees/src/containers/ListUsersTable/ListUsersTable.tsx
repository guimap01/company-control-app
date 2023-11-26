import { useMemo, useState } from 'react';
import { User, useListUsers } from './hooks/useListUsers';
import { Column, TableGrid } from '../../components/TableGrid';
import {
  VStack,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FiSearch, FiEdit2, FiTrash } from 'react-icons/fi';
import { CreateOrEditUserModal } from './CreateOrEditUserModal';
import { ConfirmDeleteUserModal } from './ConfirmDeleteUserModal';

export function ListUsersTable() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleClickEdit(user: User) {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  function handleClickDelete(user: User) {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedUser(undefined);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedUser(undefined);
  }

  const { data, isLoading, isError } = useListUsers({
    page,
    name,
  });

  const columns: Column[] = useMemo((): Column[] => {
    return [
      {
        key: 'name',
        label: 'Nome',
        accessor: 'name',
      },
      {
        key: 'email',
        label: 'E-mail',
        accessor: 'email',
      },
      {
        key: 'role',
        label: 'Cargo',
        accessor: 'role',
      },
    ];
  }, []);
  return (
    <>
      <ListUsersHeader onSearchChange={setName} />
      <TableGrid
        loading={isLoading}
        error={isError}
        columns={columns}
        data={data?.data}
        currentPage={page}
        onPageChange={setPage}
        count={data?.count}
        ActionComponent={({ row }) => (
          <TableActions
            row={row}
            onClickDelete={handleClickDelete}
            onClickEdit={handleClickEdit}
          />
        )}
      />

      {selectedUser && isEditModalOpen && (
        <CreateOrEditUserModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          user={selectedUser}
        />
      )}
      {selectedUser && isDeleteModalOpen && (
        <ConfirmDeleteUserModal
          user={selectedUser}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
}

function ListUsersHeader({
  onSearchChange,
}: {
  onSearchChange: (value: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = debounce(onSearchChange, 500);

  function onCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <VStack gap="2" w="full" mb="2">
        <Box display="flex" w="full" justifyContent="start">
          <Heading size="lg">Usuários</Heading>
        </Box>
        <Box display="flex" w="full" justifyContent="space-between">
          <InputGroup size="md" width={300} bg="white">
            <Input
              placeholder="Pesquisar"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            <InputRightElement>
              <FiSearch />
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
            Criar
          </Button>
        </Box>
      </VStack>
      {isModalOpen && (
        <CreateOrEditUserModal isOpen={isModalOpen} onClose={onCloseModal} />
      )}
    </>
  );
}

function TableActions({
  row,
  onClickEdit,
  onClickDelete,
}: {
  row: User;
  onClickEdit: (row: User) => void;
  onClickDelete: (row: User) => void;
}) {
  return (
    <Box display="flex" gap="2" justifyContent="end" w="full">
      <Tooltip label="Editar" aria-label="Editar">
        <IconButton
          variant="ghost"
          icon={<FiEdit2 />}
          aria-label="edit"
          onClick={() => onClickEdit(row)}
        />
      </Tooltip>

      <Tooltip label="Remover" aria-label="Deletar">
        <IconButton
          variant="ghost"
          icon={<FiTrash />}
          aria-label="delete"
          onClick={() => onClickDelete(row)}
        />
      </Tooltip>
    </Box>
  );
}
