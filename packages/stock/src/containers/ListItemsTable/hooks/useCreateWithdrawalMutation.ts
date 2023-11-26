import { useMutation, useQueryClient } from 'react-query';
import { useHost } from '../../../context/HostProvider';

export interface Withdrawal {
  itemId: string;
  amount: number;
}

export const useCreateWithdrawalMutation = () => {
  const { api } = useHost();
  const queryClient = useQueryClient();

  const createWithdrawal = async ({ itemId, amount }: Withdrawal) => {
    const response = await api.post(`/withdrawals`, {
      itemId,
      amount,
    });
    return response.data;
  };

  return useMutation(createWithdrawal, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};
