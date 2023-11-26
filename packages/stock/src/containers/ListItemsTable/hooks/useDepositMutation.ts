import { useMutation, useQueryClient } from 'react-query';
import { useHost } from '../../../context/HostProvider';

export interface Deposit {
  itemId: string;
  amount: number;
}

export const useDepositMutation = () => {
  const { api } = useHost();
  const queryClient = useQueryClient();

  const deposit = async ({ itemId, amount }: Deposit) => {
    const response = await api.post(`/deposits`, {
      itemId,
      amount,
    });
    return response.data;
  };

  return useMutation(deposit, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};
