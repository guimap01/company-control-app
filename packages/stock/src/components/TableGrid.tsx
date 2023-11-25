import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { Loading } from './Loading';
import { get } from 'lodash';
import { Pagination } from './Pagination';

export interface Column {
  key: string;
  label: string;
  accessor: string;
}

interface TableGridProps {
  columns: Column[];
  data?: any[];
  loading: boolean;
  error: boolean;
  count?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  ActionComponent?: (props: { row: any }) => JSX.Element;
}

export const TableGrid = ({
  columns,
  data,
  loading,
  error,
  count = 0,
  onPageChange = () => {},
  currentPage = 1,
  ActionComponent,
}: TableGridProps) => {
  if (!data) return <></>;
  return (
    <>
      <TableContainer>
        <Table variant="simple" bg="white" borderRadius="md">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.key}>{column.label}</Th>
              ))}
              {ActionComponent && <Th />}
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Loading />
                </Td>
              </Tr>
            )}
            {error && (
              <Tr>
                <Td colSpan={columns.length}>Error</Td>
              </Tr>
            )}
            {!loading &&
              !error &&
              data.map((row) => (
                <Tr key={row.id}>
                  {columns.map((column) => (
                    <Td key={`${column.key}-${row.id}`}>
                      {get(row, column.accessor)}
                    </Td>
                  ))}
                  {ActionComponent && (
                    <Td>
                      <Box display="flex" justifyContent="center">
                        <ActionComponent row={row} />
                      </Box>
                    </Td>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {count > 20 && (
        <Box w="full" display="flex" justifyContent="end">
          <Pagination
            currentPage={currentPage}
            totalItems={count}
            onPageChange={onPageChange}
          />
        </Box>
      )}
    </>
  );
};
