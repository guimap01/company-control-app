import { Box, IconButton, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const pageSize = 20;
export function Pagination({
  currentPage,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  return (
    <Box display="flex" gap="2" alignItems="center" justifyContent="center">
      <IconButton
        icon={<FiChevronLeft />}
        disabled={isFirstPage}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      />
      <Text>
        {currentPage} de {totalPages}
      </Text>
      <IconButton
        icon={<FiChevronRight />}
        disabled={isLastPage}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Box>
  );
}
