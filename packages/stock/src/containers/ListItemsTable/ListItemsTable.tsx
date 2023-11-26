import { useMemo, useState } from 'react';
import { Item, useListItems } from './hooks/useListItems';
import { Column, TableGrid } from '../../components/TableGrid';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiSearch,
  FiTrash,
} from 'react-icons/fi';
import { debounce } from 'lodash';
import { CreateItemModal } from './CreateItemModal';
import { DepositItemModal } from './DepositItemModal';
import { WithdrawalModal } from './WithdrawalModal';
import { ConfirmDeleteItemModal } from './ConfirmDeleteItemModal';
import { useConf } from '../../utils/useConf';

export function ListItemsTable() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data, isLoading, isError } = useListItems({
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
        key: 'amount',
        label: 'Quantidade',
        accessor: 'amount',
      },
      {
        key: 'itemType',
        label: 'Tipo',
        accessor: 'ItemType.name',
      },
      {
        key: 'itemCategory',
        label: 'Categoria',
        accessor: 'ItemCategory.name',
      },
    ];
  }, []);

  function handleClickDeposit(row: Item) {
    setSelectedItem(row);
    setIsDepositModalOpen(true);
  }

  function handleCloseDepositModal() {
    setIsDepositModalOpen(false);
    setSelectedItem(undefined);
  }

  function handleClickWithdraw(row: Item) {
    setSelectedItem(row);
    setIsWithdrawalModalOpen(true);
  }

  function handleCloseWithdrawalModal() {
    setIsWithdrawalModalOpen(false);
    setSelectedItem(undefined);
  }

  function handleClickEdit(row: Item) {
    setSelectedItem(row);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedItem(undefined);
  }

  function handleClickDelete(row: Item) {
    setSelectedItem(row);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedItem(undefined);
  }

  return (
    <>
      <ListItemsHeader onSearchChange={setName} />
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
            onClickDeposit={handleClickDeposit}
            onClickWithdraw={handleClickWithdraw}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      />
      {selectedItem && isDepositModalOpen && (
        <DepositItemModal
          item={selectedItem}
          isOpen={isDepositModalOpen}
          onClose={handleCloseDepositModal}
        />
      )}
      {selectedItem && isWithdrawalModalOpen && (
        <WithdrawalModal
          item={selectedItem}
          isOpen={isWithdrawalModalOpen}
          onClose={handleCloseWithdrawalModal}
        />
      )}
      {selectedItem && isEditModalOpen && (
        <CreateItemModal
          item={selectedItem}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      )}
      {selectedItem && isDeleteModalOpen && (
        <ConfirmDeleteItemModal
          item={selectedItem}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
}

function TableActions({
  row,
  onClickWithdraw,
  onClickDeposit,
  onClickDelete,
  onClickEdit,
}: {
  row: Item;
  onClickWithdraw: (row: Item) => void;
  onClickDeposit: (row: Item) => void;
  onClickDelete: (row: Item) => void;
  onClickEdit: (row: Item) => void;
}) {
  const { isAdmin } = useConf();
  return (
    <Box display="flex" gap="2" justifyContent="end" w="full">
      <Tooltip label="Retirar" aria-label="Retirar">
        <IconButton
          variant="ghost"
          icon={<FiChevronUp />}
          aria-label="withdraw"
          onClick={() => onClickWithdraw(row)}
        />
      </Tooltip>
      <Tooltip label="Depositar" aria-label="Depositar">
        <IconButton
          variant="ghost"
          icon={<FiChevronDown />}
          aria-label="deposit"
          onClick={() => onClickDeposit(row)}
        />
      </Tooltip>
      {isAdmin && (
        <>
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
        </>
      )}
    </Box>
  );
}

function ListItemsHeader({
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
          <Heading size="lg">Estoque</Heading>
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
        <CreateItemModal isOpen={isModalOpen} onClose={onCloseModal} />
      )}
    </>
  );
}
